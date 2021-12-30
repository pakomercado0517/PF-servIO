const { Router } = require("express");
const router = Router();
const userFunctions = require('../controllers/index.js')

router.get('/UserByActivityName', userFunctions.getUserByActivityName )
router.put('/:id', userFunctions.updateActivity)
router.get('/all', userFunctions.getAllActivities )
router.get('/ActivityByActivityName', userFunctions.getByActivityName )
router.post('/', userFunctions.newTechnicalActivity)
router.get('/:id', userFunctions.getProfessionalActivities)

module.exports = router;