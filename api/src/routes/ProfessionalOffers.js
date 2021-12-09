const { Router } = require("express");
const router = Router();
const offerFunctions = require('../controllers/index.js')

router.post('/', offerFunctions.newProfessionalOffer)
router.get('/all', offerFunctions.newProfessionalOffer)//pendientes de ejecutar

module.exports= router;