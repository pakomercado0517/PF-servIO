// @ts-ignore
const { Op } = require('sequelize');
const Sequelize = require('sequelize')
// @ts-ignore
const { User, Professional,ProfessionalOffer, ClientNeed, SpecificTechnicalActivity,Transactions } = require('../db.js')

module.exports ={
    newUser : async (req, res) => {
        const { userName, firstName, lastName, email, phone, city, state, photo, dniFront, dniBack, password, verified, professional,certification_name,certification_img,status, profession  } = req.body;
            let newUser = await User.create({ 
            user_name: userName,
            first_name : firstName,
            last_name: lastName,
            email,
            phone,
            city,
            state,
            photo,
            dni_front:dniFront,
            dni_back:dniBack, 
            password,
            verified,
            professional,
        })
        let a =[]
        if(professional === 'true') {
            let professional2 = await Professional.create({ 
                certification_name:certification_name,
                certification_img:certification_img,
                status,
                // profession,
                
            })

            a = professional2
            await newUser.setProfessional( professional2 )
            // await professional2.setProfession( { where: { name : profession } } )
        }
            
        
        res.send(a) 
        
    },
    newSpecificalNeed : async (req, res) => {
        const {name, description, status, location, userId} = req.body
        const newNeed = await ClientNeed.create({
            name,
            description,
            status,
            location
        })

        let users = await User.findAll({
            where :{
                id : userId
            }
        })
        await newNeed.setUser(users[0])
        res.send(users)
    },
    newTechnicalActivity: async (req, res) => {
        const { professionalId ,name, price, photo, materials }= req.body
        try {
            let activityFromProfession= await SpecificTechnicalActivity.create({
                name: name,
                price: price,
                photo: photo,
                materials: materials
            })
            
            let professional= await Professional.findAll({
                where: { id: professionalId }
            })
            
            await activityFromProfession.setProfessional(professional[0])
            res.status(200).send(professional)
        } catch (error) {
            res.status(400).send(error.message);
        }
    },
    //VERIFICAR CONTENIDO DE TRANSACTIONS
    newTransaction : async (req, res) => {
        const {id} = req.body
        let newTransaction = await Transactions.create({
            id
        })
        res.send(newTransaction)
    },
    newProfessionalOffer : async (req, res) => {
        const {description, price, duration, materials, guarantee_time, professionalId} = req.body
        const newOffert = await ProfessionalOffer.create({
            description,
            price,
            duration,
            materials,
            guarantee_time
        })
        let offert = await Professional.findAll({
            where: { id: professionalId }
        })
        await newOffert.setProfessional(offert[0])
        res.send(newOffert)
    },
    getAllUsers: async (req, res) =>{ 
    const users = await User.findAll({
        include: [{ model:Professional }]
    })
    res.send(users)
    },
    getAllProfessionals: async (req, res) =>{ 
        const professionals = await User.findAll({
            where:{
                professional: true,                  
            },
            include: [{ model: Professional}],
        })
        res.send(professionals)
    },
    getAllCommonUsers: async (req, res) => {
        const commonUsers = await User.findAll({
            where:{
                professional: false,                  
            },
            include: [{ model: ClientNeed }],
        })
        res.send(commonUsers)
    },
    getByUserId : async (req, res) => {
        const id = req.params.id;
        let user = await User.findAll({
            where: { id: { [Op.eq]: id } }
        })
        if(user[0].dataValues.professional === true) {
            user= await User.findAll({
                where: { id: { [Op.eq]: id } },
                include: [{ model: Professional }],
            })
        }
        res.send(user)
    },
    getUserByActivityName: async (req, res) =>{
        const activities = await SpecificTechnicalActivity.findAll({ 
            include:[{ 
                model: Professional
            }],
            where: {name:{ [Sequelize.Op.iLike]: `%${req.body.name}%`}}
        })
        const ids = await activities.map(e => e.Professional.UserId
            
        )
        let uniqueArr = [...new Set(ids)]
        let arrUsers = []
        for(let i= 0; i < uniqueArr.length; i++){
            arrUsers.push(await User.findAll({
                where: {id: uniqueArr[i]}
            }))
        }
        res.send(arrUsers)
    },
    getByActivityName: async (req, res) =>{
        const activities = await SpecificTechnicalActivity.findAll({ 
            include:[{ 
                model: Professional
            }],
            where: {name:{ [Sequelize.Op.iLike]: `%${req.body.name}%`}}
        })
        res.send(activities)
    },
    getAllNeeds : async (req, res) => {
        const needs = await ClientNeed.findAll({
            include: [{ model:User }]
        })
        res.send(needs)
    },
}

