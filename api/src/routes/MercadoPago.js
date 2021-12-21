const { Router } = require("express");
const router = Router();
const mercadopago = require('mercadopago')

const { ACCESS_TOKEN } = process.env;
mercadopago.configure({
	access_token: ACCESS_TOKEN,
});

router.post('/', (req, res, next) =>{
  console.log(req.body.items)
  console.log("aqui")
    let preference = {
        items: req.body.items,
        // notification_url: "http://localhost:3001/create_preference/data_payments",
        back_urls: {
          success: "http://localhost:3000/",
          failure: "http://localhost:3000/",
          pending: "http://localhost:3000/"
      },
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

router.get('/', (req, res) =>{
  res.send({message: "si entra"})
})

router.post('/data_payments', (req, res) =>{
  console.log(req.query)
  res.send({message: "OK"})
})

router.get('/data_payments', (req, res) =>{
  console.log(req.query)
  res.send({message: "OK"})
})

module.exports= router;