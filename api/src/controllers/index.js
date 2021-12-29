// @ts-ignore
const { Op } = require("sequelize");
const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const passport = require("passport");
// @ts-ignore
const {
  User,
  Profession,
  Professional,
  ProfessionalOffer,
  ClientNeed,
  SpecificTechnicalActivity,
  Transactions,
  Profession_Professional,
} = require("../db.js");
const e = require("express");

module.exports = {
  // newUser: async (req, res) => {
  //   const {
  //     // userName,
  //     firstName,
  //     lastName,
  //     email,
  //     phone,
  //     city,
  //     // state,
  //     photo,
  //     dni,
  //     password,
  //     verified,
  //     professional,
  //     certification_name,
  //     certification_img,
  //     status,
  //     profession,
  //   } = req.body;
  //   console.log(req.body);

  //   error = [];

  //   // if(!userName || !firstName || !lastName || !email || !phone || !city || !state  || !dniFront|| !dniBack || !password || !password2 ){
  //   //     error.push({message: 'Please enter all the required fields'})
  //   // }
  //   // if(password.length < 6){
  //   //     error.push({message: 'Password should be at least 6 characters'})
  //   // }
  //   // if(password !== password2){
  //   //     error.push({message: 'The password do not match'})
  //   // }

  //   const users = await User.findAll({
  //     include: [{ model: Professional }],
  //   });

  //   users.map((e) => {
  //     if (e.email === email) {
  //       error.push("Email already in use");
  //     }
  //     // if(e.userName === userName){
  //     //     error.push( 'User already in use')
  //     // }
  //   });

  //   if (error.length > 0) {
  //     res.send(error);
  //   } else {
  //     try {
  //       let hashedPassword = await bcrypt.hash(password, 10);
  //       let newUser = await User.create({
  //         // user_name: userName,
  //         first_name: firstName,
  //         last_name: lastName,
  //         email,
  //         phone: phone ? phone : 00000000,
  //         city,
  //         // state,
  //         photo: photo ? photo : "",
  //         dni,
  //         // dni_back:dniBack ? dniBack : '',
  //         password: hashedPassword,
  //         verified: verified ? verified : false,
  //         professional,
  //       });

  //       if (professional === "true") {
  //         let newProfessional = await Professional.create({
  //           // certification_name:certification_name ? certification_name: '',
  //           // certification_img:certification_img ? certification_img : '',
  //           // status : status ? status : 'normal',
  //           certification_name: "",
  //           certification_img: "",
  //           status: "normal",
  //         });
  //         let professions = profession.toLowerCase();
  //         if (typeof professions === "string") {
  //           professions = professions.split(",");
  //         }

  //         const allProfessions = await Profession.findAll({
  //           where: {
  //             name: {
  //               [Op.in]: Array.isArray(professions)
  //                 ? professions
  //                 : [professions],
  //             },
  //           },
  //         });

  //         await newProfessional.setProfessions(allProfessions);
  //         await newUser.setProfessional(newProfessional);
  //       }
  //       res
  //         .status(200)
  //         .send(
  //           `You are now registered, ${
  //             firstName + " " + lastName
  //           } please log in`
  //         );
  //     } catch (error) {
  //       res.status(400).send(error.message);
  //     }
  //   }
  // },

  // login: async (req, res) => {
  //   try {
  //     const { email, password } = req.body;

  //     const user = await User.findAll({
  //       where: { email },
  //     });

  //     let userType = "";
  //     if (user.length < 1) {
  //       res.status(200).send("Mail doesn't exist");
  //     }
  //     if (user[0].professional === true) {
  //       userType = "Professional";
  //     } else {
  //       userType = "Client";
  //     }

  //     if (user.length > 0) {
  //       bcrypt.compare(password, user[0].password, (err, isMatch) => {
  //         if (err) {
  //           res.status(200).send("error");
  //           throw err;
  //         }
  //         if (isMatch) {
  //           req.session.userId = user[0].id;
  //           let obj = { message: "Logged", cookies: req.session, userType };
  //           return res.send(obj);
  //         } else {
  //           res.send("Wrong passWord");
  //         }
  //       });
  //     }
  //     if (user.length < 0) {
  //       res.status(200).send("Something is wrong");
  //     }
  //   } catch (error) {
  //     // res.status(400).send(error.message)/
  //   }
  // },
  loginTest: async (req, res) => {
    if (req.session.userId) {
      res.send(true);
    } else {
      res.send(false);
    }
  },
  logginData: async (req, res, next) => {
    let professional = await User.findOne({});
    res.send(req.user?.id);
  },
  loginTestPassport: (req, res) => {
    if (req.isAuthenticated()) {
      res.send(true);
    } else {
      res.send(false);
    }
  },

  redirectLogin: async (req, res, next) => {
    if (!req.session.userId) {
      res.send("/login");
    } else {
      next();
    }
  },

  redirectHome: (req, res, next) => {
    if (req.session.userId) {
      res.send("dentro");
    } else {
      next();
    }
  },

  // logOut: (req, res, next) => {
  //   req.session.destroy((err) => {
  //     if (err) {
  //       res.send("Logout Failed");
  //     }
  //     res.clearCookie("sid");
  //     res.send("Logged Out");
  //   });
  // },
  logOut: (req, res) => {
    req.logout();
    res.send("logged out");
  },
  getUser: async (req, res) => {
    const { userId } = req.body;
    if (userId) {
      const user = await User.findAll({
        where: {
          id: parseInt(userId),
        },
        include: [{ model: ClientNeed }],
      });
      if (user.length > 0) {
        res.send(user);
      }
    } else {
      res.send("Please join in");
    }
  },

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
        const professional = await User.findAll({
          include: [
            {
              model: Professional,
              include: [{ model: Profession }],
            },
          ],
          where: { professional: true },
          where: { first_name: { [Sequelize.Op.iLike]: `%${name}%` } },
        });
        res.status(200).send(professional);
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  },

  newSpecificalNeed: async (req, res) => {
    const {
      name,
      description,
      location,
      //   price,
      //   duration,
      //   guarantee_time,
      userId,
    } = req.body;
    try {
      if (userId) {
        const newNeed = await ClientNeed.create({
          name,
          description,
          status: "in offer",
          location,
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
        let userWithNeed = await User.findAll({
          where: {
            id: parseInt(userId),
          },
          include: [{ model: ClientNeed }],
        });
        res.status(200).send(newNeed);
      } else {
        res.status(400).send("Please login");
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  },

  newTechnicalActivity: async (req, res) => {
    const {
      name,
      price,
      photo,
      materials,
      description,
      guarantee,
      guarantee_time,
      job_time,
      userId,
    } = req.body;

    try {
      let activityFromProfession = await SpecificTechnicalActivity.create({
        name,
        price,
        photo,
        materials,
        description,
        guarantee,
        guarantee_time,
        job_time,
      });

      let professional = await Professional.findAll({
        where: { UserId: userId },
      });
      await activityFromProfession.setProfessional(professional[0]);
      res.status(200).send(activityFromProfession);
    } catch (error) {
      res.status(400).send(error.message);
    }
    // }
  },
  //COMENTAR QUE SE REQUIERE INPUT DIRECTO DE IDS DE USUARIOS
  newTransaction: async (req, res) => {
    if (req.session.userId) {
      try {
        let newTransaction = await Transactions.create({
          id: parseInt(req.session.userId),
        });
        res.status(200).send(newTransaction);
      } catch (error) {
        res.status(400).send(error.message);
      }
    } else {
      res.send("Pleas Login");
    }
  },
  //CONDICIONAR QUE SOLO PUEDAN OFERTAR PROFESIONALES
  newProfessionalOffer: async (req, res) => {
    const {
      description,
      price,
      duration,
      materials,
      guarantee_time,
      ClientNeedId,
    } = req.body;
    try {
      if (!req.session.userId) {
        res.status(400).send("Please Login");
      } else {
        const newOffert = await ProfessionalOffer.create({
          description,
          price,
          duration,
          materials,
          guarantee_time,
        });
        let clientNeeds = await ClientNeed.findAll({
          where: { id: ClientNeedId },
        });
        let offert = await Professional.findAll({
          where: { UserId: req.session.userId },
        });
        await newOffert.setProfessional(offert[0]);
        await newOffert.setClientNeed(clientNeeds[0]);
        res.status(200).send(newOffert);
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await User.findAll({
        include: [{ model: Professional }],
      });
      res.status(200).send(users);
    } catch (error) {
      res.status(400).send(error.message);
    }
  },

  getAllProfessionals: async (req, res) => {
    try {
      const professionals = await User.findAll({
        where: {
          professional: true,
        },
        include: [{ model: Professional, include: [{ model: Profession }] }],
      });
      res.status(200).send(professionals);
    } catch (error) {
      res.status(400).send(error.message);
    }
  },

  getAllCommonUsers: async (req, res) => {
    try {
      const commonUsers = await User.findAll({
        where: {
          professional: false,
        },
        include: [{ model: ClientNeed }],
      });
      res.status(200).send(commonUsers);
    } catch (error) {
      res.status(400).send(error.message);
    }
  },

  getByUserId: async (req, res) => {
    try {
      const id = req.params.id;
      let user = await User.findAll({
        where: { id: { [Op.eq]: id } },
      });
      if (user[0].dataValues.professional === true) {
        user = await User.findAll({
          where: { id: { [Op.eq]: id } },
          include: [{ model: Professional, include: [{ model: Profession }] }],
        });
      }
      res.status(200).send(user);
    } catch (error) {
      res.status(400).send(error.message);
    }
  },

  getUserByActivityName: async (req, res) => {
    const { name } = req.body;
    try {
      const activities = await SpecificTechnicalActivity.findAll({
        include: [
          {
            model: Professional,
            include: [{ model: Profession }],
          },
        ],
        where: { name: { [Sequelize.Op.iLike]: `%${name}%` } },
      });
      const ids = await activities.map((e) => e.Professional.UserId);
      let uniqueArr = [...new Set(ids)];
      let arrUsers = [];
      for (let i = 0; i < uniqueArr.length; i++) {
        arrUsers.push(
          await User.findAll({
            where: { id: uniqueArr[i] },
          })
        );
      }
      res.status(200).send(arrUsers);
    } catch (error) {
      res.status(400).send(error.message);
    }
  },

  getAllActivities: async (req, res) => {
    try {
      const activities = await SpecificTechnicalActivity.findAll({
        include: [
          {
            model: Professional,
            include: [{ model: Profession }],
            include: [{ model: User }],
          },
        ],
      });
      res.status(200).send(activities);
    } catch (error) {
      res.status(400).send(error.message);
    }
  },

  getByActivityName: async (req, res) => {
    try {
      const activities = await SpecificTechnicalActivity.findAll({
        include: [
          {
            model: Professional,
            include: [{ model: Profession }],
          },
        ],
        where: { name: { [Sequelize.Op.iLike]: `%${req.body.name}%` } },
      });
      res.status(200).send(activities);
    } catch (error) {
      res.status(400).send(error.message);
    }
  },

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

  getAllPorfessionalOffers: async (req, res) => {
    try {
      const allOfferts = await ProfessionalOffer.findAll({});
      res.status(200).send(allOfferts);
    } catch {
      res.status(400).send(err.message);
    }
  },

  getUserReceivedOffers: async (req, res) => {
    userNeeds = await ClientNeed.findAll({
      where: { UserId: req.session.userId },
    });
    const needsId = await userNeeds.map((e) => e.id);
    let receivedOffers = [];
    for (let i = 0; i < needsId.length; i++) {
      receivedOffers.push(
        await ProfessionalOffer.findAll({
          where: { id: needsId[i] },
        })
      );
    }
    res.send(receivedOffers);
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

  updateProfile: async (req, res) => {
    const {
      // userName,
      firstName,
      lastName,
      // email,
      phone,
      city,
      state,
      photo,
      dni,
      // password,
      // verified,
      professional,
      certification_name,
      certification_img,
      status,
      profession,
    } = req.body;
    const id = req.params.id;
    try {
      await User.update(
        {
          first_name: firstName,
          last_name: lastName,
          // email,
          phone,
          city,
          state,
          photo,
          dni,
          professional,
        },
        { where: { id: id } }
      );
      await Professional.update(
        {
          certification_name,
          certification_img,
          status,
        },
        { where: { UserId: id } }
      );

      let prof = await Professional.findOne({
        where: { UserId: id },
      });
      let professionalId = prof.id;
      await Profession_Professional.destroy({
        where: { ProfessionalId: professionalId },
      });

      //   const findProfession = await Profession.findAll({
      //     where: { name: profession },
      //   });
      let professions = profession;
      if (typeof professions === "string") {
        professions = professions.split(",");
      }

      const allProfessions = await Profession.findAll({
        where: {
          name: {
            [Op.in]: Array.isArray(professions) ? professions : [professions],
          },
        },
      });
      await prof.setProfessions(allProfessions);

      res.send("updated");
    } catch (error) {
      res.send(error.message);
    }
  },
  test: async (req, res) => {
    const { id } = req.body;

    res.send("borrado");
  },
  getProfessionalActivities: async (req, res) => {
    const id = req.params.id;
    try {
      if (id) {
        const professional = await Professional.findOne({
          where: { UserId: id },
        });
        if (professional) {
          const professionalId = professional.id;
          const activities = await SpecificTechnicalActivity.findAll({
            where: { ProfessionalId: professionalId },
          });
          if (activities.length > 0) {
            res.status(200).send(activities);
          } else {
            res.status(200).send("There are not specifical Activities");
          }
        } else {
          res.status(200).send("There are not specifical Activities");
        }
      } else {
        res.status(200).send("There are not specifical Activities");
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
  getNeedsById: async (req, res) => {
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
  getById: async (req, res) => {
    const id = req.params.id;
    if (id) {
      const need = await ClientNeed.findOne({
        where: {
          id,
        },
      });
      res.status(200).send(need);
    } else {
      res.status(400).send("Please insert an id");
    }
  },
  // newSpecificalNeed: async (req, res) =>{
  //     const {name, description, location} = req.body
  //     const newNeed = await ClientNeed.create({
  //         name,
  //         description,
  //         location,
  //         status: 'in offer'
  //     })
  //     res.send(newNeed)
  // },
  // getByProfessionName: async (req, res) =>{
  //     const {profession} = req.body
  //     const professionalArr = profession.split(',')
  //     try {
  //         const professionals = await Professional.findAll({
  //             include:[{
  //                 model: Profession
  //             }],
  //         })

  //         const usersId = professionals.map(e => {

  // if(professionalArr.length > 1){
  //     for(let i=0; i<professionalArr.length; i++){

  //         if(professionalArr[i].toLowerCase() === e.toLowerCase()){
  //             return e
  //         }
  //     }
  // }
  // else{

  //     if(professionalArr[0].toLowerCase() === e){
  //         return e
  //     }
  // }
  //             let obj = {professions : e.Professions, userId: e.id}
  //             return obj
  //         })

  //         res.status(200).send(usersId)

  //     } catch (error) {
  //         // res.status(400).send(error.message)
  //     }
  // },
  googleSignin: async (req, res, next) => {
    const profile = await req.user._json;
    console.log("user", profile);
    const user = await User.findOne({ where: { email: profile.email } });
    if (user) {
      res.status(200).send({
        message: "Logged",
        cookies: req.session,
        userType: user.professional ? "Professional" : "Normal User",
        data: req.user,
      });
    }
    if (!user) {
      let registerUser = await User.create({
        first_name: profile.given_name,
        last_name: profile.family_name,
        photo: profile.picture,
        email: profile.email,
        verified: profile.email_verified,
        professional: false,
      });
      console.log("Se inició con exito, esta es la información", req.session);
      res.status(200).send({
        message: `Registered with id: ${registerUser.id}`,
        cookies: req.session,
        userType: "Normal User",
        data: req.user,
      });
    } else {
      return res.redirect("http://localhost:3000");
    }
  },
};
