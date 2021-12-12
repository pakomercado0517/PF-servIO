const { Router } = require("express");
const router = Router();
const professionsFunctions = require('../controllers/index.js')

router.get('/all', professionsFunctions.getAllProfessions )
router.get('/Name', professionsFunctions.getAllProfessionsName)// pendiente de ejecutar

module.exports= router;