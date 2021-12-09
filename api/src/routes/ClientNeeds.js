const { Router } = require("express");
const router = Router();
const needFunctions = require('../controllers/index.js')

router.get('/all', needFunctions.getAllNeeds )
router.post('/', needFunctions.newSpecificalNeed)

module.exports= router;