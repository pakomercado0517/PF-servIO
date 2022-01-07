const { Router } = require("express");
const router = Router();
const transactionsFunctions = require('../controllers/index.js')

router.get('/all', transactionsFunctions.getAllTransactions)//Pendiente
router.post('/', transactionsFunctions.newTransaction)

module.exports= router;