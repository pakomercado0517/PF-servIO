const { Router } = require("express");
const router = Router();
const functions = require('../controllers/MercadoPago')

// POST
router.post('/', functions.newTransaction)

// GET
router.get('/succes', functions.succesTransaction)

router.get('/pending', (req, res) =>{
  console.log(req.query)
  res.redirect("http://localhost:3000/")
})

router.get('/failure', (req, res) =>{
  console.log(req.query)
  res.redirect("http://localhost:3000/cart")
})

module.exports= router;