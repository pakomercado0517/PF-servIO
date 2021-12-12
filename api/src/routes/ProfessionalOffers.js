const { Router } = require("express");
const router = Router();
const offerFunctions = require('../controllers/index.js')

router.post('/', offerFunctions.newProfessionalOffer)
router.get('/all', offerFunctions.getAllPorfessionalOffers)//pendientes de ejecutar
router.get('/receivedOffers', offerFunctions.getUserReceivedOffers )
module.exports= router;