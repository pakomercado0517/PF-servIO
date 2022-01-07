const Sequelize = require("sequelize");
const { User, ProfessionalOffer, ClientNeed } = require("../db.js");

module.exports = {
  getOffersByUserId: async (req, res) => {
    const id = req.params.id
    try{
      const offers = await ProfessionalOffer.findAll({ where: { UserId: id }})
      if(!offers[0]) {
        res.send("No offers found")
      } else {
        res.send(offers)
      }
    }catch(error){
      console.log(error)
    }
  },
  
  getAllPorfessionalOffers: async (req, res) => {
    try {
      const allOfferts = await ProfessionalOffer.findAll({});
      res.status(200).send(allOfferts);
    } catch {
      res.status(400).send(err.message);
    }
  },

  getUserReceivedOffers: async (req, res) => {
    const UserId = req.params.id;
    userNeeds = await ClientNeed.findAll({
      where: { UserId },
    });

    if (userNeeds.length > 0) {
      const needsId = await userNeeds.map((e) => e.id);
      let receivedOffers = [];
      for (let i = 0; i < needsId.length; i++) {
        receivedOffers.push({
          offer: await ProfessionalOffer.findAll({
            where: { ClientNeedId: needsId[i] },
          }),
          needId: needsId[i],
        });
      }
      res.send(receivedOffers);
    } else {
      res.send("Sin Ofertas");
    }

  },

  getNeedReceivedOffers: async (req, res) => {
    const ClientNeedId = req.params.id;
    const offers = await ProfessionalOffer.findAll({ where: { ClientNeedId } });

    if (offers.length > 0) {
      res.send(offers);
    } else {
      res.send("No offers found");
    }
  },

  newProfessionalOffer: async (req, res) => {
    const {
      name,
      description,
      price,
      duration,
      materials,
      guarantee_time,
      ClientNeedId,
      UserId,
    } = req.body;

    const user = await User.findOne({ where: { id: UserId } });

    try {
      if (user) {
        if (user.professional === false) {
          res.status(400).send("Only Professionals can make an offer");
        } else {
          const newOffert = await ProfessionalOffer.create({
            name,
            description,
            price,
            duration,
            materials,
            guarantee_time,
            status: "in offer"
          });
          let clientNeeds = await ClientNeed.findAll({
            where: { id: ClientNeedId },
          });
          let setuser = await User.findOne({
            where: { id: UserId },
          });
          await newOffert.setUser(setuser)
          await newOffert.setClientNeed(clientNeeds[0]);
          res.status(200).send(newOffert);
        }
      } else {
        res.send("user does not exist");
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  },

  deleteOfferById: async (req, res) => {
    const id = req.params.id;
    const offer = await ProfessionalOffer.findOne({ where: { id } });
    if (!offer){
      res.send("La oferta ya ha sido eliminada o no existe")
    }else{
      offer.destroy();
    res.send( "La oferta ha sido eliminada.");
    }
  },

  updateOffer: async (req, res) => {
    const {
      name,
      description,
      price,
      duration,
      materials,
      guarantee_time,
      status,
    } = req.body;
    const id = req.params.id;
    try {
      await ProfessionalOffer.update(
        {
          name,
          description,
          price,
          duration,
          materials,
          guarantee_time,
          status,
        },
        { where: { id } }
      );
      res.send("updated");
    } catch (error) {
      res.send(error.message);
    }
  },

}