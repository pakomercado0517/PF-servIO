// const express = require('express');
// const passport = require('passport');
// const Strategy = require('passport-local').Strategy
// const {User} = require('../db.js')
// const server = express();


// server.use(new Strategy(
//     async function async(user, password, done) {
//         const user2 = await User.findAll({
//             where: { email: user }
//         })
//         if(!user2){
//             return done(null, false);
//         }
//         if(user2.password !== password){
//             return done(null, false);
//         }
//         return done(null,user)
//     }
// ))
// server.use((req, res, next) => {
//     console.log(req.session)
//     console.log(req.user)
//     next()
// })
// passport.serializeUser(function(user,done){
//     done(null, user.id)
// })

// passport.deserializeUser(async function(id, done){

//     const user = await User.findAll({
//         where: { id: id }
//     })
// })