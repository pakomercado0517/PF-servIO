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


const userData =
[{"id":1,"user_name":"awearing0","first_name":"Almeta","last_name":"Wearing","email":"awearing0@illinois.edu","phone":"316-202-2491","city":"Quezalguaque","state":null,"photo":"http://dummyimage.com/248x100.png/ff4444/ffffff","dni_front":"http://dummyimage.com/171x100.png/dddddd/000000","dni_back":"http://dummyimage.com/135x100.png/5fa2dd/ffffff","password":"rCreZlbj81","verified":false,"professional":true},
{"id":2,"user_name":"ewillgoss1","first_name":"Estrellita","last_name":"Willgoss","email":"ewillgoss1@youku.com","phone":"437-765-9700","city":"La Libertad","state":null,"photo":"http://dummyimage.com/144x100.png/cc0000/ffffff","dni_front":"http://dummyimage.com/172x100.png/ff4444/ffffff","dni_back":"http://dummyimage.com/210x100.png/ff4444/ffffff","password":"rnSS0Q","verified":true,"professional":true},
{"id":3,"user_name":"eperutto2","first_name":"Ebba","last_name":"Perutto","email":"eperutto2@sbwire.com","phone":"878-402-1124","city":"Shuangtang","state":null,"photo":"http://dummyimage.com/145x100.png/dddddd/000000","dni_front":"http://dummyimage.com/140x100.png/dddddd/000000","dni_back":"http://dummyimage.com/209x100.png/ff4444/ffffff","password":"jP4vlt1","verified":true,"professional":true},
{"id":4,"user_name":"hmacbain3","first_name":"Hamlen","last_name":"MacBain","email":"hmacbain3@sphinn.com","phone":"153-424-3630","city":"Kalilangan","state":null,"photo":"http://dummyimage.com/211x100.png/dddddd/000000","dni_front":"http://dummyimage.com/227x100.png/ff4444/ffffff","dni_back":"http://dummyimage.com/155x100.png/5fa2dd/ffffff","password":"2CJsH5V90","verified":true,"professional":false},
{"id":5,"user_name":"egavahan4","first_name":"Emmott","last_name":"Gavahan","email":"egavahan4@ihg.com","phone":"789-131-5905","city":"Pamatang","state":null,"photo":"http://dummyimage.com/205x100.png/5fa2dd/ffffff","dni_front":"http://dummyimage.com/175x100.png/dddddd/000000","dni_back":"http://dummyimage.com/228x100.png/cc0000/ffffff","password":"fjIyGC6hO0a","verified":false,"professional":true},
{"id":6,"user_name":"ncescot5","first_name":"Noreen","last_name":"Cescot","email":"ncescot5@icq.com","phone":"737-249-2385","city":"Ngajum","state":null,"photo":"http://dummyimage.com/101x100.png/ff4444/ffffff","dni_front":"http://dummyimage.com/220x100.png/5fa2dd/ffffff","dni_back":"http://dummyimage.com/181x100.png/5fa2dd/ffffff","password":"HCYmaM","verified":true,"professional":true},
{"id":7,"user_name":"kwickersley6","first_name":"Karrie","last_name":"Wickersley","email":"kwickersley6@prweb.com","phone":"846-470-1213","city":"Dongjin","state":null,"photo":"http://dummyimage.com/145x100.png/ff4444/ffffff","dni_front":"http://dummyimage.com/132x100.png/ff4444/ffffff","dni_back":"http://dummyimage.com/243x100.png/cc0000/ffffff","password":"9Oy3MBctwV","verified":true,"professional":true},
{"id":8,"user_name":"einsworth7","first_name":"Elyse","last_name":"Insworth","email":"einsworth7@edublogs.org","phone":"488-614-8459","city":"Resplendor","state":null,"photo":"http://dummyimage.com/229x100.png/ff4444/ffffff","dni_front":"http://dummyimage.com/238x100.png/dddddd/000000","dni_back":"http://dummyimage.com/180x100.png/cc0000/ffffff","password":"jsoZbLzhsY","verified":false,"professional":true},
{"id":9,"user_name":"hbruntjen8","first_name":"Hamel","last_name":"Bruntjen","email":"hbruntjen8@hugedomains.com","phone":"500-283-0159","city":"Padamulya","state":null,"photo":"http://dummyimage.com/249x100.png/ff4444/ffffff","dni_front":"http://dummyimage.com/108x100.png/ff4444/ffffff","dni_back":"http://dummyimage.com/121x100.png/cc0000/ffffff","password":"49sAgZe","verified":false,"professional":false},
{"id":10,"user_name":"eluxton9","first_name":"Erminia","last_name":"Luxton","email":"eluxton9@wix.com","phone":"116-125-5719","city":"Hønefoss","state":"Buskerud","photo":"http://dummyimage.com/152x100.png/ff4444/ffffff","dni_front":"http://dummyimage.com/125x100.png/5fa2dd/ffffff","dni_back":"http://dummyimage.com/176x100.png/cc0000/ffffff","password":"PJkNlmNo","verified":true,"professional":false},
{"id":11,"user_name":"gpraundlina","first_name":"Gonzalo","last_name":"Praundlin","email":"gpraundlina@mac.com","phone":"778-911-7498","city":"Xingbin","state":null,"photo":"http://dummyimage.com/155x100.png/ff4444/ffffff","dni_front":"http://dummyimage.com/176x100.png/ff4444/ffffff","dni_back":"http://dummyimage.com/124x100.png/cc0000/ffffff","password":"sC2eOukbPt5I","verified":true,"professional":true},
{"id":12,"user_name":"palbrechtb","first_name":"Pate","last_name":"Albrecht","email":"palbrechtb@youku.com","phone":"995-802-3628","city":"Barrancabermeja","state":null,"photo":"http://dummyimage.com/198x100.png/5fa2dd/ffffff","dni_front":"http://dummyimage.com/102x100.png/cc0000/ffffff","dni_back":"http://dummyimage.com/123x100.png/ff4444/ffffff","password":"k17DBOrEzw","verified":false,"professional":false},
{"id":13,"user_name":"ttouzeyc","first_name":"Tedie","last_name":"Touzey","email":"ttouzeyc@dagondesign.com","phone":"589-111-0085","city":"Ituzaingó","state":null,"photo":"http://dummyimage.com/231x100.png/cc0000/ffffff","dni_front":"http://dummyimage.com/130x100.png/cc0000/ffffff","dni_back":"http://dummyimage.com/150x100.png/dddddd/000000","password":"uevmJA","verified":true,"professional":true},
{"id":14,"user_name":"wdechelled","first_name":"Willa","last_name":"Dechelle","email":"wdechelled@tamu.edu","phone":"403-548-8760","city":"Torez","state":null,"photo":"http://dummyimage.com/237x100.png/cc0000/ffffff","dni_front":"http://dummyimage.com/224x100.png/dddddd/000000","dni_back":"http://dummyimage.com/170x100.png/dddddd/000000","password":"uGrBlsIAj02U","verified":false,"professional":true},
{"id":15,"user_name":"clarozee","first_name":"Coralie","last_name":"Laroze","email":"clarozee@sina.com.cn","phone":"562-228-7643","city":"Rancakole","state":null,"photo":"http://dummyimage.com/184x100.png/dddddd/000000","dni_front":"http://dummyimage.com/249x100.png/ff4444/ffffff","dni_back":"http://dummyimage.com/200x100.png/dddddd/000000","password":"txOiSIG","verified":false,"professional":false},
{"id":16,"user_name":"skirleyf","first_name":"Starlene","last_name":"Kirley","email":"skirleyf@vinaora.com","phone":"452-826-7619","city":"Göteborg","state":"Västra Götaland","photo":"http://dummyimage.com/241x100.png/ff4444/ffffff","dni_front":"http://dummyimage.com/133x100.png/ff4444/ffffff","dni_back":"http://dummyimage.com/115x100.png/ff4444/ffffff","password":"lkoFhF1V","verified":false,"professional":true},
{"id":17,"user_name":"jvanarsdallg","first_name":"Johnette","last_name":"Van Arsdall","email":"jvanarsdallg@upenn.edu","phone":"600-251-9633","city":"Saeul","state":null,"photo":"http://dummyimage.com/135x100.png/5fa2dd/ffffff","dni_front":"http://dummyimage.com/159x100.png/cc0000/ffffff","dni_back":"http://dummyimage.com/232x100.png/ff4444/ffffff","password":"6G5mX9W2cA","verified":true,"professional":true},
{"id":18,"user_name":"mscammondenh","first_name":"Mickie","last_name":"Scammonden","email":"mscammondenh@google.nl","phone":"848-198-8320","city":"Abomsa","state":null,"photo":"http://dummyimage.com/215x100.png/5fa2dd/ffffff","dni_front":"http://dummyimage.com/107x100.png/5fa2dd/ffffff","dni_back":"http://dummyimage.com/149x100.png/dddddd/000000","password":"fP28MLX","verified":false,"professional":false},
{"id":19,"user_name":"dcovellei","first_name":"Davy","last_name":"Covelle","email":"dcovellei@ezinearticles.com","phone":"603-494-8259","city":"Kangar","state":"Perlis","photo":"http://dummyimage.com/165x100.png/ff4444/ffffff","dni_front":"http://dummyimage.com/188x100.png/ff4444/ffffff","dni_back":"http://dummyimage.com/137x100.png/dddddd/000000","password":"Ids4vjG3xt","verified":false,"professional":false},
{"id":20,"user_name":"kkeeneyj","first_name":"Kain","last_name":"Keeney","email":"kkeeneyj@opera.com","phone":"688-637-8031","city":"Kivsharivka","state":null,"photo":"http://dummyimage.com/243x100.png/5fa2dd/ffffff","dni_front":"http://dummyimage.com/249x100.png/cc0000/ffffff","dni_back":"http://dummyimage.com/232x100.png/cc0000/ffffff","password":"qowt3Yt","verified":false,"professional":true}]

// console.log( userData.length);

const userMap = userData.map(
    (user) => {
        return {
            // id: user.id,
            user_name: user.user_name,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            // phone: user.phone,
            city: user.city,
            state: user.state,
            photo: user.photo,
            dni_front: user.dni_front,
            dni_back: user.dni_back,
            password: user.password,
            verified: user.verified,
            professional: user.professional
        }
    }
)

const professions = [
    {
        "id": 1,
        "Profession": "pintor",
    },
    {
        "id": 2,
        "Profession": "carpintero",
    },
    {
        "id": 3,
        "Profession": "albañil",
    },
    {
        "id": 4,
        "Profession": "Electricista",
    },
    {
        "id": 5,
        "Profession": "Plomero",
    },
    {
        "id": 6,
        "Profession": "Herrero",
    },
    {
        "id": 7,
        "Profession": "Cerrajero",
    },
]

const professionsMap = professions.map( elem => {
    return {
        // id: elem.id,
        name: elem.Profession
    }
});
// console.log("ProfessionsMap: ", professionsMap);

const professionals = [
    {
        id: 1,
        certificationName: "lalala",
        certificationImg: "lalala",
        status: "normal",
    },
    {
        id: 2,
        certificationName: "lalala",
        certificationImg: "lalala",
        status: "vip",
    },
    {
        id: 3,
        certificationName: "lalala",
        certificationImg: "lalala",
        status: "normal",
    },
    {
        id: 4,
        certificationName: "lalala",
        certificationImg: "lalala",
        status: "vip",
    },
    {
        id: 5,
        certificationName: "lalala",
        certificationImg: "lalala",
        status: "normal",
    },
];

// console.log("professionals", professionals.length)

const profesionalsMap = professionals.map( elem => {
    return {
        // id: elem.id,
        certificationName: elem.certificationName,
        certificationImg: elem.certificationImg,
        status: elem.status,
    }
});
// console.log("profesionalsMap: ", profesionalsMap);


const { conn, User, Profession } = require('./src/db');
const server = require('./src/app.js');
// const { userMap } = require('./src/DbExample/user.js');


conn.sync( { force: false } ).then( () => {
    server.listen(3001, async () => {
        
        try {
            await User.bulkCreate(userMap);
            await Profession.bulkCreate(professionsMap);
        }
        catch (err) {
            // console.log(err);
        }
        
        console.log('Server is running on port 3001');
    });
});