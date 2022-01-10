const { Router } = require("express");
const router = Router();
const needFunctions = require('../controllers/ClientNeedsControllers.js')

router.get('/all', needFunctions.getAllNeeds )//
router.get('/need', needFunctions.getNeedByName )///
router.get('/:id', needFunctions.getNeedsByUserId)//
router.put('/:id', needFunctions.updateNeed)//
router.post('/', needFunctions.newSpecificalNeed)//
router.get('/need/:id', needFunctions.getById )//
router.delete('/:id', needFunctions.deleteNeedById )
router.put('/confirm/:token', needFunctions.confirm)//
router.get('/confirm/:token', needFunctions.validarToken)//

module.exports= router;