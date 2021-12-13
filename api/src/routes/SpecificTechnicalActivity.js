const { Router } = require("express");
const router = Router();
const userFunctions = require('../controllers/index.js')

router.get('/UserByActivityName', userFunctions.getUserByActivityName )
router.get('/all', userFunctions.getAllActivities )
router.get('/ActivityByActivityName', userFunctions.getByActivityName )
router.post('/', userFunctions.newTechnicalActivity)

module.exports = router;