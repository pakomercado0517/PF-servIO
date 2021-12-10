const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { User } = require('./db.js')
const passport = require('passport');
function initialize() {
    const authenticateUser = async (email, password, done ) => {
        User.findAll({
            where:{ email } // Users.findOne({ email })
        })
        .then(user => {
            if(!user){
                return done(null, false, { errors: { 'email or password': 'is invalid' } });
            }
            else{
            bcrypt.compare(password, user[0].password, (err, isMatch) =>{
                if(err){
                    throw err;
                }
                if(isMatch){
                    return done(null, user)
                }else{
                    return done(null, false, {message:'PassWord is not correct'})
                }
            })}
            return done(null, user);
        }).catch(done);
    }

    passport.use( 
        new LocalStrategy({ 
            usernameField: 'email',
            passwordField: 'password',
        }, authenticateUser)
    )

    // passport.serializeUser((user, done) => done(null, user.id));

    // passport.deserializeUser( (id, done) => {
    //     let user = User.findAll({
    //         where:{ id }
    //     })
    //     return done(null, user)
    // })
}

module.exports = initialize;