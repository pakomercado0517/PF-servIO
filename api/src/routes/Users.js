const { Router } = require("express");
const router = Router();
const userFunctions = require('../controllers/index.js')

router.post('/NewSpecificalNeed', userFunctions.newSpecificalNeed)
router.post('/NewTechnicalActivity', userFunctions.newTechnicalActivity)
router.post('/', userFunctions.newUser)
router.get('/allUsers', userFunctions.getAllUsers)
router.get('/allProfessionals', userFunctions.getAllProfessionals)
router.get('/commonUsers', userFunctions.getAllCommonUsers )
router.get('/allUsers/:id', userFunctions.getByUserId )
router.get('/getByActivityName', userFunctions.getByActivityName )
router.get('/getAllNeeds', userFunctions.getAllNeeds )

module.exports= router;