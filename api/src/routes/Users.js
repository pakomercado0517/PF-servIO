const { Router } = require("express");
const router = Router();
const userFunctions = require('../controllers/index.js')



router.get('/logged', userFunctions.loginTest)
router.get('/home', userFunctions.redirectLogin, userFunctions.redirectHome)
router.post('/logout', userFunctions.logOut)
router.post('/', userFunctions.newUser)
router.post('/login',userFunctions.login)
router.get('/perfil', userFunctions.getUser)
router.get('/all', userFunctions.getAllUsers) 
router.get('/common', userFunctions.getAllCommonUsers) 
router.get('/professionals', userFunctions.getAllProfessionals) 
router.get('/:id', userFunctions.getByUserId ) 
router.post('/NewSpecificalNeed', userFunctions.newSpecificalNeed) 
router.post('/NewTechnicalActivity', userFunctions.newTechnicalActivity) 
router.post('/newProfessionalOffer', userFunctions.newProfessionalOffer)


module.exports= router;