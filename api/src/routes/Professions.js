const { Router } = require("express");
const router = Router();
const professionsFunctions = require('../controllers/index.js')

router.get('/all', professionsFunctions.getAllProfessions )
// router.get('/byName', professionsFunctions.getByProfessionName)// pendiente de ejecutar

module.exports= router;