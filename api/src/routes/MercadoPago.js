const { Router } = require("express");
const router = Router();
const mercadopago = require('mercadopago')

// require('dotenv').config();
const { ACCESS_TOKEN } = process.env;
mercadopago.configure({
	access_token: ACCESS_TOKEN,
});

router.post('/', (req, res, next) =>{
  console.log(req.body)
  console.log("aqui")
    let preference = {
        items: [
          {
            title: req.body.items[0].title,
            unit_price: req.body.items[0].unit_price,
            quantity: 1,
          }
        ]
      };
      
      mercadopago.preferences.create(preference)
      .then(function(response){
        console.log("thenn")
      // Este valor reemplazará el string "<%= global.id %>" en tu HTML
        // global.id = response.body.id;
        res.json({
          id: response.body.id
        });
      }).catch(function(error){
        console.log("Error: ----- ", error);
      });
})

router.get('/', (req, res) =>{
  res.send({message: "si entra"})
})

module.exports= router;