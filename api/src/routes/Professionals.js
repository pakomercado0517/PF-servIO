const { Router } = require("express");
const router = Router();
const professionalFunctions = require('../controllers/index.js')


router.get('/', professionalFunctions.getProfessionalByName )

module.exports= router;