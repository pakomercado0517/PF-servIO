const { Router } = require("express");
const router = Router();
const transactionsFunctions = require('../controllers/TransactionsControllers.js')

// GET
router.get('/all', transactionsFunctions.getAllTransactions)
router.get('/all/:id', transactionsFunctions.getAllTransactionsById)
// POST
router.post('/', transactionsFunctions.newTransaction)
// PUT
router.put('/confirm', transactionsFunctions.confirmDone)
// DELETE
router.delete('/:id', transactionsFunctions.deleteTransaction)

module.exports= router;