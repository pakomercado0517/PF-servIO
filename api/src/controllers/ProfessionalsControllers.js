const Sequelize = require("sequelize");
const { User, Professional, Profession } = require("../db.js");

module.exports= {
  getProfessionalByName: async (req, res) => {
  const { name } = req.query;
  try {
    if (!name) {
      const professional = await User.findAll({
        include: [
          {
            model: Professional,
            include: [{ model: Profession }],
          },
        ],
        where: { professional: true },
      });
      res.status(200).send(professional);
    } else {
      if(name.split(' ').length === 1){
        const professional = await User.findAll({
        include: [
          {
            model: Professional,
            include: [{ model: Profession }],
          },
        ],
        where: { 
          [Sequelize.Op.or]:[
            {
              first_name: { 
                [Sequelize.Op.iLike]: `%${name}%` 
              }
            } , 
            {
              last_name: { 
                [Sequelize.Op.iLike]: `%${name}%` 
              }
            }  
          ]
        }
      });

      let newProfessional = professional.filter(e => e.professional === true)
      res.status(200).send(newProfessional);

      }else{
        let nombre = name.split(' ')[0]
        let apellido = name.split(' ')[1]
        const professional = await User.findAll({
          include: [
            {
              model: Professional,
              include: [{ model: Profession }],
            },
          ],
          // where: { professional: true },
          where: { 
            [Sequelize.Op.or]:[
              {
                first_name: { 
                  [Sequelize.Op.iLike]: `%${nombre}%` 
                }
              } , 
              {
                last_name: { 
                  [Sequelize.Op.iLike]: `%${apellido}%` 
                }
              }  
            ]
          }
        });
        let newProfessional = professional.filter(e => e.professional === true)
        res.status(200).send(newProfessional);
      }
      
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
},
}
