const { Router } = require("express");
const router = Router();
const userFunctions = require('../controllers/index.js')

router.get('/UserByActivityName', userFunctions.getUserByActivityName )
router.get('/ActivityByActivityName', userFunctions.getByActivityName )
router.post('/', userFunctions.newTechnicalActivity)

module.exports= router;