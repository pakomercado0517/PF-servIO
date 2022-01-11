const Sequelize = require("sequelize");
const { ProfessionalOffer, ClientNeed, SpecificTechnicalActivity, Transactions, User } = require("../db.js");
const enviarEmail = require("../handlers/email");
const crypto = require("crypto");
module.exports ={
  getAllTransactions: async (req, res) => {
    try {
      const allTransactions = await Transactions.findAll({})
      if (typeof allTransactions === "array" && !allTransactions.length) return res.send("No hay transacciones")
      res.send(allTransactions)
    } catch (error) {
      res.status(400).send(error)
    }
  },

  getAllTransactionsById: async (req, res) => {

    const { id } = req.params

    try {
      const allTransactions = await Transactions.findAll({
        where: {
          UserId: id
        },
        include: {
          model: ClientNeed
        }
      })
      if (typeof allTransactions === "array" && !allTransactions.length) return res.send("No hay transacciones para este usuario")
      res.send(allTransactions)
    } catch (error) {
      res.status(400).send(error)
    }
  },

  newTransaction: async (req, res) => {
    const {
      data
    } = req.body

    let response = [];

    const dataSpecificTechnicalActivity = data.filter( el => el.type === "specific technical activity" )
    const dataOffer = data.filter( el => el.type === "offer" )

    // News ClientNeed

    if (dataSpecificTechnicalActivity[0]) {

      // Create a ClientNeed to every SpecificTechnicalActivity

      const arrayOfClientNeeds = dataSpecificTechnicalActivity.map(el => {
        console.log(el.UserId)
        return {
          name: el.name,
          description: el.description,
          status: "pending to pay",
          location: el.location,
          photo: el.photo,
          UserId: el.UserId,
          SpecificTechnicalActivityId: el.specificTechnicalActivityId,
        }
      })

      try {
        const newClientNeeds = await ClientNeed.bulkCreate(arrayOfClientNeeds)

        // SAVE ID OF NEW DATA TO SEND ON DATA ARRAY
        const aux = dataSpecificTechnicalActivity.map((el,index) => {
          return {
            ...el,
            ClientNeedId: newClientNeeds[index].id
          }
        })
        response = [...response, ...aux]

      } catch (error) {
        res.status(400).send(error.message);
      }
    }

    // News SpecificTechnicalActivity and Update ClientNeeds

    if (dataOffer[0]) {

      // Turn every offer to news Specific Technical Activity with "specific" vs "general" status

      const newSpecificTechnicalActivities = dataOffer.map(el => {
        return {
          name: el.name,
          price: el.price,
          photo: el.photo,
          materials: el.materials,
          guarantee: el.guarantee,
          guarantee_time: el.guarantee_time,
          job_time: el.duration,
          ProfessionalId: el.ProfessionalId,
          type: "specific",
        }
      })

      // Update, for every offer, one ClientNeed with status "pending to pay" that was related with their Specific Technical Activity

      try {
        const newActivites = await SpecificTechnicalActivity.bulkCreate(newSpecificTechnicalActivities)

        // SAVE ID OF NEW DATA TO SEND ON DATA ARRAY
        const aux = dataOffer.map((el,index) => {
          return {
            ...el,
            SpecificTechnicalActivityId: newActivites[index].id
          }
        })
        response = [...response, ...aux]

        const updateClientNeeds = dataOffer.map((el, index) => {
          return {
            id: el.ClientNeedId,
            status: "pending to pay",
            SpecificTechnicalActivityId: newActivites[index].id,
            location: el.location,
          }
        })
        // Update status of ProfessionalOffer to pending to pay
        const updateOffer = dataOffer.map((el, index) => {
          return {
            status: "pending to pay",
            id: el.ProfessionalOfferId,
          }
        })
        await ProfessionalOffer.bulkCreate(updateOffer, { updateOnDuplicate: ["status"]})
        await ClientNeed.bulkCreate(updateClientNeeds, { updateOnDuplicate: ["status", "SpecificTechnicalActivityId", "location"] })
      } catch (error) {
        res.status(400).send(error.message);
      }
    }


    // Create transaction finaly and send email to user to inform succes pending transaction

    try {
      const { dataValues } = await Transactions.create({
        data: response,
        status: "pending to pay",
      })
      res.send({
        ...dataValues,
        message: "Created successfuly"
      })
    } catch (error) {
      res.status(400).send(error.message);
    }
  },

  confirmDone: async (req, res) =>{
    const id = req.body.id;
    const need = await ClientNeed.findOne({ where: {id}})
    if(need) {
      const userId = need.UserId;
      const usuario = await User.findOne({ where: {id:userId}})
      if(usuario){
        let token = crypto.randomBytes(20).toString("hex");
        need.token = token
        need.expiracion = Date.now() + 3600000
        await need.save()
        const confirmUrl =`http://localhost:3000/confirm/${token}`
        await enviarEmail.enviar({
          usuario,
          subject: "Confirmar Servicio culminado",
          confirmUrl,
          archivo: `<h2>Confirmar Servicio culminado</h2><p>Hola, El tecnico encargado de tu necesidad "${need.name}" ha confirmado que ha culminado el servicio,  en caso de que esto sea cierto, confirmalo o rechaza dicha afirmacion  dando click aqui </p><a href=${confirmUrl} >Confirmacion de servicio</a><p>Si no puedes acceder a este enlace, visita ${confirmUrl}</p><div/>`,
        });    
      }
      res.status(200).send('Se ha enviado correo de confiamcion')
    }else{
      res.status(200).send('No se ha podido encontrar esa necesidad')
    }

  }
}