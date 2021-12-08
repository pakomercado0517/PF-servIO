// certificationName
// certificationImg
// status
// const {userData}= require('./user')
// const {User, Professional}= require('../db')
// const { Op } = require('sequelize');



const professionals = [
    {
        certification_name: "lalala",
        certification_img: "lalala",
        status: "normal",
        profession: "carpintero",
        userId:1
    },
    {
        certification_name: "lalala",
        certification_img: "lalala",
        status: "vip",
        profession: "carpintero",
        userId:2
    },
    {
        certification_name: "lalala",
        certification_img: "lalala",
        status: "normal",
        profession: "carpintero",
        userId:3
    },
    {
        certification_name: "lalala",
        certification_img: "lalala",
        status: "vip",
        profession: "carpintero",
        userId:6
    },
    {
        certification_name: "lalala",
        certification_img: "lalala",
        status: "normal",
        profession: "carpintero",
        userId:13
    },
];

const professionalMap= professionals.map(el=> {
    return {
        certification_name: el.certification_name,
        certification_img: el.certification_img,
        status: el.status,
        profession: el.profession,
        UserId: el.userId
    }
})

// const professionalCreateDb= async ()=> {
//     const users= userData.filter(el=> el.professional === true) // devuelve los usuarios con professional true 

//     users.map(el=> {
//         let users= User.create({
//             user_name: el.user_name,
//             first_name : el.first_name,
//             last_name: el.last_name,
//             email: el.email,
//             phone: el.phone,
//             city: el.city,
//             state: el.state,
//             photo: el.photo,
//             dni_front: el.dni_front,
//             dni_back: el.dni_back,
//             password: el.password,
//             verified: el.verified,
//             professional: el.professional,
//     })
//         professionals.map(el=> {
//             let professionals_result= Professional.create({
//                 certification_name: el.certification_name,
//                 certification_img: el.certification_img,
//                 status: el.status,
//                 professional: el.professional,
//             })
//             users.setProfessional(professionals_result)
//         })

//     })
// }

module.exports= {professionalMap}