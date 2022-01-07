const { User, Profession, Professional } = require("../db.js");

module.exports ={
  getAllProfessions: async (req, res) => {
    const professions = await Profession.findAll({
      include: [
        {
          model: Professional,
          include: [{ model: User }],
        },
      ],
    });
    res.status(200).send(professions);
  },

  getAllProfessionsName: async (req, res) => {
    try {
      let professions = await Profession.findAll({});
      let names = await professions.map((e) => e.name);
      res.status(200).send(names);
    } catch {
      res.status(404).send(err.message);
    }
  },
}