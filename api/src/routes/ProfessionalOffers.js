const { Router } = require("express");
const router = Router();
const offerFunctions = require('../controllers/index.js')

router.post('/', offerFunctions.newProfessionalOffer)
router.get('/all/:id', offerFunctions.getOffersByUserId)
router.get('/all', offerFunctions.getAllPorfessionalOffers)
router.get('/:id', offerFunctions.getUserReceivedOffers )
router.get('/need/:id', offerFunctions.getNeedReceivedOffers )
module.exports= router;