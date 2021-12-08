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


// relacion usuario - professional
User.hasOne(Professional);
Professional.belongsTo(User);

// relacion profesional - profesion
Profession.belongsToMany(Professional, { through: 'Profession_Professional' });
Professional.belongsToMany(Profession, { through: 'Profession_Professional' });

// relacion necesidades del cliente - profesion
User.hasMany(ClientNeed);
ClientNeed.belongsTo(User);

// relacion puntaje del cliente - profesional

User.hasMany(ClientReview);
Professional.hasMany(ClientReview);

// relacion ofertas de profesional - profesion
Professional.hasMany(ProfessionalOffer);

// relacion profesional - servicios ofrecidos
Professional.hasMany(SpecificTechnicalActivity);
SpecificTechnicalActivity.belongsTo(Professional);
// relacion transacciones cliente - profesional
User.hasMany(Transactions);
Professional.hasMany(Transactions);


module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
