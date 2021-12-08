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




const { conn, User, Professional } = require('./src/db');
const server = require('./src/app.js');
const {userMap}  = require('./src/DbExample/user.js');
const {professionalMap}= require('./src/DbExample/professionals')
// console.log('user', user)


conn.sync( { force: true } ).then( () => {
    server.listen(3001, async () => {
        
        try {
            await User.bulkCreate(userMap);
            await Professional.bulkCreate(professionalMap)
        }
        catch (err) {
            console.log(err);
        }
        
        console.log('Server is running on port 3001');
    });
});