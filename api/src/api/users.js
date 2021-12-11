// const { Router } = require("express");
// const router = Router();
// const passport = require('passport');
// const auth = require('../auth');



// router.post('/login', (auth.optional, (req, res,next) => {
//     const {email , password} = req.body
//     if(!email) {
//         return res.status(422).json({
//             errors: { 
//                 email: 'is required',
//             },
//         });
//     }
        
//     if(!password) {
//         return res.status(422).json({
//             errors: {
//                 password: 'is required',
//             },
//         });
//     }

//     return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
//         if(err) {
//             return next(err);
//         }
//         if(passportUser) {
//             const user = {passportUser};
//             user.token = {passportUser}.generateJWT();  
//             return res.json({ user: user.toAuthJSON() });
//         }
//         return res.status(400).info;
//     })(req, res, next);
// }))

// module.exports= router;