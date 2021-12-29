const { Router } = require("express");
const router = Router();
const needFunctions = require('../controllers/index.js')

router.get('/all', needFunctions.getAllNeeds )
router.get('/:id', needFunctions.getNeedsById)
router.put('/:id', needFunctions.updateNeed)
router.post('/', needFunctions.newSpecificalNeed)
router.get('/need/:id', needFunctions.getById )

module.exports= router;