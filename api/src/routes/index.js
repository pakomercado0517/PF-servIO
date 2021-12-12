const { Router } = require('express');
const UsersRoute = require('./Users.js')
const ClientNeedsRoute = require('./ClientNeeds.js')
const ProfesssionalOffer = require('./ProfessionalOffers.js')
const Professions = require('./Professions')
const Reviews = require('./Reviews.js')
const Professional = require('./Professionals.js')
const TecnicalActivities = require('./SpecificTechnicalActivity.js')
const Transactions = require('./Transactions.js')
const User = require('./Users.js')
const router = Router();


router.use("/users", UsersRoute)
router.use("/clientNeeds", ClientNeedsRoute)
router.use("/professsionalOffer", ProfesssionalOffer)
router.use("/professionals", Professional)
router.use("/professions", Professions)
router.use("/reviews", Reviews)
router.use("/TecnicalsActivities", TecnicalActivities)
router.use("/Transactions", Transactions)
router.use("/User", User)


module.exports = router;

