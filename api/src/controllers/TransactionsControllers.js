const Sequelize = require("sequelize");
const { ProfessionalOffer, ClientNeed, SpecificTechnicalActivity, Transactions } = require("../db.js");

module.exports ={
  getAllTransactions: async (req, res) => {
    const allTransactions = await Transactions.findAll({})
    res.send(allTransactions)
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
}