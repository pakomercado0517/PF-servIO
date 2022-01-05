// @ts-ignore
const { Op } = require("sequelize");
const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const passport = require("passport");
const enviarEmail = require("../handlers/email");
const crypto = require("crypto");
var juice = require("juice");
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
  ClientReview,
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
        if(name.split(' ').length === 1){
          const professional = await User.findAll({
          include: [
            {
              model: Professional,
              include: [{ model: Profession }],
            },
          ],
          where: { professional: true },
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
        res.status(200).send(professional);
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
            where: { professional: true },
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
          res.status(200).send(professional);
        }
        
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
      // const reviews = await ClientReview.findAll({

      // })
      const professionals = await User.findAll({
        where: {
          professional: true,
        },
        include: [
          {
            model: Professional,
            include: [
              { model: Profession },
              { model: ClientReview },
              { model: SpecificTechnicalActivity },
            ],
          },
        ],
      });
      const rate = professionals.map((r) => {
        if(r.Professional.ClientReviews !== []){
          let userRate = 0
                for(let i = 0 ; i < r.Professional.ClientReviews.length; i++){
                    userRate +=  parseInt(r.Professional.ClientReviews[i].score)
                }
                let average = userRate / r.Professional.ClientReviews.length
                // let userRate2 = {userRate : average}
                r.rate = average
                return r;
        }else{
          // let userRate2 = {userRate : 0}
          r.rate = 0
          return r;
        }
        
      });
      res.status(200).send(rate);
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
      if (user[0]) {
        user = await User.findAll({
          where: { id: { [Op.eq]: id } },
          //include: [{ model: Professional, include: [{ model: Profession },{model: ClientReview}, {model: SpecificTechnicalActivity}] }],
          include: [
            {
              model: Professional,
              include: [
                { model: Profession },
                { model: ClientReview },
                { model: SpecificTechnicalActivity },
              ],
            },
          ],
        });
        res.status(200).send(user);
      } else {
        res.status(200).send("El usuario no existe.");
      }
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

  // ************ CLIENT NEEDS
  
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

  deleteNeedById: async (req, res) => {
    const id = req.params.id;
    const need = await ClientNeed.findOne({ where: { id } });
    need.destroy();
    res.send(
      "La necesidad especifica ha sido eliminada."
    );
  },

  // ************ PROFESSIONAL OFFERS
  
  //CONDICIONAR QUE SOLO PUEDAN OFERTAR PROFESIONALES
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
          });
          let clientNeeds = await ClientNeed.findAll({
            where: { id: ClientNeedId },
          });
          // let offert = await Professional.findAll({
          //   where: { UserId },
          // });
          let setuser = await User.findAll({
            where: { id: UserId },
          });
          await newOffert.setUser(setuser[0])
          // await newOffert.setProfessional(offert[0]);
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

  getAllPorfessionalOffers: async (req, res) => {
    try {
      const allOfferts = await ProfessionalOffer.findAll({});
      res.status(200).send(allOfferts);
    } catch {
      res.status(400).send(err.message);
    }
  },
  //MODIFICAR!!!!!!!!
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
            where: { id: needsId[i] },
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
  getAllProfessionsName: async (req, res) => {
    try {
      let professions = await Profession.findAll({});
      let names = await professions.map((e) => e.name);
      res.status(200).send(names);
    } catch {
      res.status(404).send(err.message);
    }
  },
  
  getOffersByUserId: async (req, res) => {
    const id = req.params.id
    try{
      
      // const professional = await Professional.findOne({where: {UserId: id}})
      // const ProfessionalId = professional.id

      const offers = await ProfessionalOffer.findAll({ where: { UserId: id }})
      res.send(offers)

    }catch(error){
      console.log(error)
    }
  },

  deleteOfferById: async (req, res) => {
    const id = req.params.id;
    const offer = await ProfessionalOffer.findOne({ where: { id } });
    offer.destroy();
    res.send(
      `La oferta ha sido eliminada.`
    );
  },

  // ************ USER

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
  
  enviarToken: async (req, res) => {
    const { email } = req.body;
    const usuario = await User.findOne({ where: { email } });
    if (!usuario) {
      res.send("No existe esa cuenta");
    } else {
      usuario.token = crypto.randomBytes(20).toString("hex");
      usuario.expiracion = Date.now() + 3600000;

      //guardarlos en la base de datos
      await usuario.save();

      //url de reset
      const resetUrl = `http://${req.headers.host}/user/reestablecer/${usuario.token}`;

      //Enviar correo con el token

      // console.log(resetUrl)

      await enviarEmail.enviar({
        usuario,
        subject: "Password Reset",
        resetUrl,
        archivo: `<h2>Restablecer Password</h2><p>Hola, has solicitado reestablecer tu password, haz click en el siguiente enlace para reestablecerlo, este enlace es temporal, en caso de vencer vuelve a solicitarlo </p><a href=${resetUrl} >Resetea tu password</a><p>Si no puedes acceder a este enlace, visita ${resetUrl}</p><div/>`,
      });
      // res.redirect('/iniciar-sesion'/)
      res.send("Se envio un mensaje a tu correo");
    }
  },

  validarToken: async (req, res) => {
    const usuario = await User.findOne({
      where: {
        token: req.params.token,
      },
    });

    if (!usuario) {
      res.send("Token invalido");
    }
    res.send({ estado: "valido", token: req.params.token });
  },

  actualizarPassword: async (req, res) => {
    const usuario = await User.findOne({
      where: {
        token: req.params.token,
        expiracion: {
          [Op.gte]: Date.now(),
        },
      },
    });

    if (!usuario) {
      // req.flash("error", "No valido"), 
      res.redirect("/reestablecer/");
    }

    //haashear el nuevo password para
    usuario.password = bcrypt.hashSync(
      req.body.password,
      bcrypt.genSaltSync(10)
    );
    usuario.token = null;
    usuario.expiracion = null;

    //guardar nuevo password
    await usuario.save();
    res.send("Tu password se ha modificado correctamente");
  },

  deleteByUserId: async (req, res) => {
    const id = req.params.id;
    const user = await User.findOne({ where: { id } });
    user.destroy();
    res.send(
      `El usuario ${user.first_name + " " + user.last_name}  ha sido eliminado.`
    );
  },

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
        data: user,
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
        data: registerUser,
      });
    }
    next();
  },

  updateActivity: async (req, res) => {
    const {
      name,
      price,
      photo,
      materials,
      description,
      guarantee,
      guarantee_time,
      job_time,
    } = req.body;
    const id = req.params.id;
    try {
      const activity = await SpecificTechnicalActivity.findOne({
        where: { id },
      });

      if (activity) {
        activity.name = name ? name : activity.name;
        activity.price = price ? price : activity.price;
        activity.photo = photo ? photo : activity.photo;
        activity.materials = materials ? materials : activity.materials;
        activity.description = description ? description : activity.description;
        activity.guarantee = guarantee ? guarantee : activity.guarantee;
        activity.guarantee_time = guarantee_time
          ? guarantee_time
          : activity.guarantee_time;
        activity.job_time = job_time ? job_time : activity.job_time;
        await activity.save();

        res.status(200).send(activity);
      } else {
        res.status(400).send("Inserta Id de actividad existente");
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  },

  githubAuth: async (req, res) => {
    const user = req.user._json;
    const name = user.name.split(" ");
    const findUser = await User.findOne({ where: { email: user.login } });
    if (findUser) {
      res.redirect("http://localhost:3000/login");
    } else {
      User.create({
        first_name: user.name[0],
        last_name: user.name[1],
        email: user.login,
        photo: user.avatar_url,
        professional: false,
      });
      res.redirect("http://localhost:3000/login");
    }
  },
};
