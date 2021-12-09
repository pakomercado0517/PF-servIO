require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

// console.log('DB_HOST', DB_HOST);

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/servio`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});

const basename = path.basename(__filename);
const modelDefiners = [];
// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
// @ts-ignore
sequelize.models = Object.fromEntries(capsEntries);


const { User, 
        Profession, 
        Professional, 
        ClientNeed, 
        ClientReview, 
        ProfessionalOffer, 
        SpecificTechnicalActivity, 
        Transactions } = sequelize.models;
//*************************************RELACIONES USUARIO****************************************************************

//Relacion User - client_need
User.hasMany(ClientNeed);
ClientNeed.belongsTo(User);

//Relacion User - Transactions
User.hasMany(Transactions);
Transactions.belongsTo(User);

//Relacion User - Profesional
User.hasOne(Professional);
Professional.belongsTo(User);

// //Relacion User - ClientReview
User.hasMany(ClientReview)
ClientReview.belongsTo(User);

//*************************************RELACIONES Profesional****************************************************************

//Relacion Profesional - profesion
Professional.belongsToMany(Profession, { through: 'Profession_Professional' });
Profession.belongsToMany(Professional, { through: 'Profession_Professional' });

//Relacion Profesional - transacción
Professional.hasMany(Transactions);
Transactions.belongsTo(Professional);

//Relacion Profesional - SpecificTechnicalActivity
Professional.hasMany(SpecificTechnicalActivity);
SpecificTechnicalActivity.belongsTo(Professional);

//Relacion Profesional - ProfessionalOffer
Professional.hasMany(ProfessionalOffer)
ProfessionalOffer.belongsTo(Professional);

//Relacion Profesional - ClientReview
Professional.hasMany(ClientReview);
ClientReview.belongsTo(Professional);

//*************************************RELACIONES Client_Need****************************************************************

//Relacion client_need - transactions
ClientNeed.hasOne(Transactions);
Transactions.belongsTo(ClientNeed);

//Relacion client_need - professional_offer
ClientNeed.hasMany(Professional);
Professional.belongsTo(ClientNeed);

//Relacion client_need - Profesion
ClientNeed.hasOne(Profession);
Profession.belongsTo(ClientNeed);

//*************************************RELACIONES Professional_Offer****************************************************************

//Relation ProfessionalOffer - Transaction
ProfessionalOffer.hasOne(Transactions);
Transactions.belongsTo(ProfessionalOffer);

//Relacion ProfessionalOffer - ClientReview
ProfessionalOffer.hasOne(ClientReview)
ClientReview.belongsTo(ProfessionalOffer);



//*************************************PETICIONES ANTERIORES****************************************************************
// // relacion usuario - professional
// User.hasOne(Professional);
// Professional.belongsTo(User);

// // relacion profesional - profesion
// // Profession.belongsToMany(Professional, { through: 'Profession_Professional' });
// // Professional.belongsToMany(Profession, { through: 'Profession_Professional' });

// // relacion necesidades del cliente - profesion
// User.hasMany(ClientNeed);
// ClientNeed.belongsTo(User);

// // relacion puntaje del cliente - profesional

// User.hasMany(ClientReview);
// Professional.hasMany(ClientReview);

// // relacion ofertas de profesional - profesion
// Professional.hasMany(ProfessionalOffer);
// ProfessionalOffer.belongsTo(Professional);

// // relacion profesional - servicios ofrecidos
// Professional.hasMany(SpecificTechnicalActivity);
// SpecificTechnicalActivity.belongsTo(Professional);
// // relacion transacciones cliente - profesional
// User.hasMany(Transactions);
// Professional.hasMany(Transactions);
//******************************************************************************************************************************

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};