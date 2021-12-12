const { Router } = require("express");
const router = Router();
const userFunctions = require('../controllers/index.js')



router.get('/logged', userFunctions.loginTest)
router.get('/home', userFunctions.redirectLogin, userFunctions.redirectHome)
router.post('/logout', userFunctions.logOut)
router.post('/', userFunctions.newUser) // --------> /users/
router.post('/login',userFunctions.login)
router.get('/perfil', userFunctions.getUser)
router.get('/all', userFunctions.getAllUsers) // --------> /users/all
router.get('/common', userFunctions.getAllCommonUsers) // --------> /users/common
router.get('/professionals', userFunctions.getAllProfessionals) // --------> /users/professionals
router.get('/:id', userFunctions.getByUserId ) // --------> /users/:id
router.post('/NewSpecificalNeed', userFunctions.newSpecificalNeed) //====> /clientNeeds/
router.post('/NewTechnicalActivity', userFunctions.newTechnicalActivity) // =======> /TecnicalActivities/
router.post('/newProfessionalOffer', userFunctions.newProfessionalOffer)// =======> /professsionalOffer


module.exports= router;