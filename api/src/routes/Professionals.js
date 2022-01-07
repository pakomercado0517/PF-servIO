const { Router } = require("express");
const router = Router();
const professionalFunctions = require('../controllers/ProfessionalsControllers.js')


router.get('/', professionalFunctions.getProfessionalByName )

module.exports= router;