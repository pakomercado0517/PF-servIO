const { Router } = require("express");
const router = Router();
const professionsFunctions = require('../controllers/ProfessionsControllers.js')

router.get('/all', professionsFunctions.getAllProfessions )
router.get('/name', professionsFunctions.getAllProfessionsName)

module.exports= router;