const Sequelize = require("sequelize");
const { User, ProfessionalOffer, ClientNeed } = require("../db.js");
const { Op } = require("sequelize");

module.exports = {
  getAllNeeds: async (req, res) => {
    try {
      const needs = await ClientNeed.findAll({
        include: [{ model: User }, { model: ProfessionalOffer }],
      });
      res.status(200).send(needs);
    } catch (error) {
      res.status(400).send(error.message);
    }
  },

  getNeedByName: async (req, res) => {
    try {
      const need = await ClientNeed.findAll({
        include: [{ model: User }],
        where: { name: { [Sequelize.Op.iLike]: `%${req.query.name}%` } },
      });
      res.status(200).send(need);
    } catch (error) {
      res.status(400).send(error.message);
    }
  },

  getNeedsByUserId: async (req, res) => {
    const id = req.params.id;
    try {
      if (id > 0) {
        const needs = await ClientNeed.findAll({
          where: { UserId: id },
        });
        if (needs) {
          res.status(200).send(needs);
        } else {
          res.status(200).send("User does not have any need");
        }
      } else {
        res.status(200).send("Please insert an id");
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  },

  updateNeed: async (req, res) => {
    const {
      name,
      description,
      location,
      status, //   price,//   duration,//   guarantee_time
    } = req.body;
    const id = req.params.id;
    try {
      const need = await ClientNeed.findOne({
        where: { id },
      });

      if (need) {
        need.name = name ? name : need.name;
        need.description = description ? description : need.description;
        need.location = location ? location : need.location;
        if (
          status === "done" ||
          status === "in progress" ||
          status === "in offer"
        ) {
          need.status = status;
        } else {
          need.status = need.status;
        }

        await need.save();

        res.status(200).send(need);
      } else {
        res.status(400).send("Inserta Id de necesidad existente");
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  },

  newSpecificalNeed: async (req, res) => {
    const {
      name,
      description,
      // location,
      photo,
      //   price,
      //   duration,
      //   guarantee_time,
      userId,
    } = req.body;
    // console.log(req.body)
    try {
      if (userId) {
        const newNeed = await ClientNeed.create({
          name : name ? name : '',
          description: description ? description : '',
          status: "in offer",
          // location: location ? location : '',
          photo: photo ? photo : '',
          //   price,
          //   duration,
          //   guarantee_time,
        });

        let allUsers = await User.findAll({
          where: {
            id: parseInt(userId),
          },
        });

        await newNeed.setUser(allUsers[0]);
        // let userWithNeed = await User.findAll({
        //   where: {
        //     id: parseInt(userId),
        //   },
        //   include: [{ model: ClientNeed }],
        // });
        res.status(200).send(newNeed);
      } else {
        res.status(400).send("Please login");
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  },

  getById: async (req, res) => {
    const id = req.params.id;
    if (id) {
      const need = await ClientNeed.findOne({
        where: {
          id,
        },
      });
      res.status(200).send(need);
    }
    else {
      res.status(400).send("Please insert an id");
    }
  },
  
  deleteNeedById: async (req, res) => {
    const id = req.params.id;
    if(id){
      const need = await ClientNeed.findOne({ where: { id } });
      if (need){
        need.destroy();
        res.status(200).send( "La necesidad especifica ha sido eliminada.");
      } else {
        res.status(404).send("Need not found")
      }
    }else{
      res.status(200).send( "Por favor inserta un id.");
    }
  },

  confirm : async (req, res) => {
    console.log(req.params.token)
    const need = await ClientNeed.findOne({
      
      where: {
        token: req.params.token,
        expiracion: {
          [Op.gte]: Date.now(),
        },
      },
    });
    if (!need) {
      // req.flash("error", "No valido"),  
      res.send("INVALIDO");
    }else{
      need.token = null;
      need.expiracion = null;
      need.status = 'done'
    //guardar nuevo password
      await need.save();
      res.send({message: 'needConfirmed', need});
    }

  }
};