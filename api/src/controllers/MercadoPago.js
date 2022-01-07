const mercadopago = require('mercadopago')

const { ACCESS_TOKEN_MERCADO_PAGO } = process.env;
mercadopago.configure({
    access_token: ACCESS_TOKEN_MERCADO_PAGO,
});

const {
    User,
    Profession,
    Professional,
    ProfessionalOffer,
    ClientNeed,
    SpecificTechnicalActivity,
    Transactions,
    Profession_Professional,
    ClientReview,
} = require("../db.js");

module.exports = {
    newTransaction: (req, res) => {
        let preference = {
            ...req.body
        };

        mercadopago.preferences.create(preference)
            .then(function (response) {
                // Este valor reemplazará el string "<%= global.id %>" en tu HTML
                // global.id = response.body.id;
                res.json({
                    id: response.body.id
                });
            }).catch(function (error) {
                console.log("Error: ----- ", error);
            });
    },
    succesTransaction: async (req, res) => {

        // Find transaction that match with id

        const id = req.query.external_reference;
        const transaction = await Transactions.findOne({
            where: { id }
        })

        // UPDATE EVERY STATE OF CLIENT NEED ID ONLY

        if (transaction.data) {

            const updateStatus = transaction.data.map(el => {
                return {
                    id: el.ClientNeedId,
                    status: "in progress",
                }
            })

            try {
                await ClientNeed.bulkCreate(updateStatus, { updateOnDuplicate: ["status"] })
            } catch (error) {
                res.status(400).send(error.message);
            }

        }

        // UPDATE STATUS OF PROFESSIONALOFFERS TO HIRED 

        const dataOffer = transaction.data.filter( el => el.type === "offer" )

        if (dataOffer[0]) {

            const updateOffer = dataOffer.map((el, index) => {
                return {
                    status: "hired",
                    id: el.ProfessionalOfferId,
                }
            })
            await ProfessionalOffer.bulkCreate(updateOffer, { updateOnDuplicate: ["status"] })

        }

        // CHANGE STATUS TO REST OF OFFERS THAT NOT MATCH WITH HIRED OFFERS


        // SEND EMAIL TO USER TO INFORM ABOUT SUCCES APPROVED TRANSACTION


        res.redirect("http://localhost:3000/")
    }
}