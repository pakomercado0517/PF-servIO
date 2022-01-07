const { Router } = require("express");
const router = Router();
const offerFunctions = require('../controllers/ProfessionalOffersControllers.js')

// GET METHODS
router.get('/all/:id', offerFunctions.getOffersByUserId)
router.get('/all', offerFunctions.getAllPorfessionalOffers)//
router.get('/:id', offerFunctions.getUserReceivedOffers)//
router.get('/need/:id', offerFunctions.getNeedReceivedOffers)//
// POST METHODS
router.post('/', offerFunctions.newProfessionalOffer)//
// DELETE METHODS
router.delete('/:id', offerFunctions.deleteOfferById)//
// PUT METHODS
router.put('/:id', offerFunctions.updateOffer )

module.exports= router;