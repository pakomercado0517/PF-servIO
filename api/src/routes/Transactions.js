const { Router } = require("express");
const router = Router();
const transactionsFunctions = require('../controllers/TransactionsControllers.js')

router.get('/all', transactionsFunctions.getAllTransactions)
router.get('/all/:id', transactionsFunctions.getAllTransactionsById)
router.post('/', transactionsFunctions.newTransaction)
router.put('/confirm', transactionsFunctions.confirmDone)

module.exports= router;