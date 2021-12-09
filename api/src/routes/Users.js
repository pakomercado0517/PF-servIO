const { Router } = require("express");
const router = Router();
const userFunctions = require('../controllers/index.js')

router.post('/', userFunctions.newUser) // --------> /users/
router.get('/all', userFunctions.getAllUsers) // --------> /users/all
router.get('/common', userFunctions.getAllCommonUsers) // --------> /users/common
router.get('/professionals', userFunctions.getAllProfessionals) // --------> /users/professionals
router.get('/:id', userFunctions.getByUserId ) // --------> /users/:id
// router.post('/NewSpecificalNeed', userFunctions.newSpecificalNeed) ====> /clientNeeds/
// router.post('/NewTechnicalActivity', userFunctions.newTechnicalActivity) =======> /TecnicalActivities/
// router.post('/newProfessionalOffer', userFunctions.newProfessionalOffer) =======> /professsionalOffer
// router.get('/getUserByActivityName', userFunctions.getUserByActivityName ) ======> /TecnicalActivities/UserByActivityName
// router.get('/getByActivityName', userFunctions.getByActivityName ) ======> /TecnicalActivities/ActivityByActivityName
// router.get('/getAllNeeds', userFunctions.getAllNeeds )  ===========> /clientNeeds/

module.exports= router;