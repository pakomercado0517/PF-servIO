const { Router } = require("express");
const router = Router();
const mercadopago = require('mercadopago')

const { ACCESS_TOKEN_MERCADO_PAGO } = process.env;
mercadopago.configure({
	access_token: ACCESS_TOKEN_MERCADO_PAGO,
});

router.post('/', (req, res) =>{
  console.log(req.body)
    let preference = {
        ...req.body
      };
      
      mercadopago.preferences.create(preference)
      .then(function(response){
        console.log(response)
      // Este valor reemplazará el string "<%= global.id %>" en tu HTML
        // global.id = response.body.id;
        res.json({
          id: response.body.id
        });
      }).catch(function(error){
        console.log("Error: ----- ", error);
      });
})

router.get('/succes', (req, res) =>{
  console.log(req.query)
  res.redirect("http://localhost:3000/")
})

router.get('/pending', (req, res) =>{
  console.log(req.query)
  res.redirect("http://localhost:3000/")
})

router.get('/failure', (req, res) =>{
  console.log(req.query)
  res.redirect("http://localhost:3000/cart")
})

module.exports= router;