const { Router } = require("express");
const router = Router();
const mercadopago = require('mercadopago')

const { ACCESS_TOKEN_MERCADO_PAGO } = process.env;
mercadopago.configure({
	access_token: ACCESS_TOKEN_MERCADO_PAGO,
});

router.post('/', (req, res) =>{
  console.log(req.body.items)
    let preference = {
        items: req.body.items,
        payer: {
            name: "Juan",
            surname: "Lopez",
            email: "user@email.com",
            phone: {
                area_code: "11",
                number: 4444-4444
            },
            identification: {
                type: "DNI",
                number: "12345678"
            },
            address: {
                street_name: "Street",
                street_number: 123,
                zip_code: "5700"
            }
        },
        back_urls: {
          success: "http://localhost:3001/create_preference/succes",
          failure: "http://localhost:3001/create_preference/failure",
          pending: "http://localhost:3001/create_preference/pending"
      },
      statement_descriptor: "MINEGOCIO",
      external_reference: "Hola Amigoooo",
      };
      
      mercadopago.preferences.create(preference)
      .then(function(response){
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