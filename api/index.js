//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// npm init
// npm install nodemon --save-dev
// npm install express sequelize pg morgan axios

// console.log( userData.length);

const {
  conn,
  User,
  Professional,
  ClientReview,
  ClientNeed,
  ProfessionalOffer,
  Profession,
} = require("./src/db");
const server = require("./src/app.js");
const { initialFunction } = require("./src/DbExample/user.js");
const { professionalMap } = require("./src/DbExample/professionals");
const { reviewMap } = require("./src/DbExample/clientReview");
const { needMap } = require("./src/DbExample/clientNeed");
const { offerMap } = require("./src/DbExample/professionalOffers");
const { professionsMap } = require("./src/DbExample/Professions");
// console.log('user', user)

conn.sync({ force: true }).then(() => {
  server.listen(3001, async () => {
    try {
      await initialFunction();
      (await Professional.bulkCreate(professionalMap))
        ? console.log("|---Professional---| Created")
        : console.log("Professional not created");
      (await ClientReview.bulkCreate(reviewMap))
        ? console.log("|---Client Review---| Created")
        : console.log("Client Review not created");
      (await ClientNeed.bulkCreate(needMap))
        ? console.log("|---Client Need---| Created")
        : console.log("Client Need not created");
      (await ProfessionalOffer.bulkCreate(offerMap))
        ? console.log("|---Professional Offer---| Created")
        : console.log("Professional Offer not created");
      (await Profession.bulkCreate(professionsMap))
        ? console.log("|---Professional---| Created")
        : console.log("Professional not created");
    } catch (err) {
      // console.log(err);
    }

    console.log("Server is running on port 3001");
  });
});
