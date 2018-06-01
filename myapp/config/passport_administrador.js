const LocalStrategy = require('passport-local').Strategy;
const User = require('../app/models/user_administrador');

module.exports = function(passport){
passport.serializeUser(function(user, done){
done(null, user.id);
    });
passport.deserializeUser(function(id, done){
User.findById(id, function(err, user){
done(err, user);
});
 });
 
//para registrar el usuario 
passport.use('local-administrador_registro', new LocalStrategy({
usernameField: 'email',
passwordField: 'password',
passReqToCallback: true
},
function (req, email,password, done){
User.findOne({'local.email': email}, function(error, user){
    if(error){ return done(error);}
    if(user){
        return done(null, false, req.flash('registrarMessage', 'El email ya existe'));
    }else{
        var newUser = new User();
        newUser.local.email = email;
       // newUser.local.password = password;
        newUser.local.password = newUser.generateHash(password);
        newUser.save(function(error){
            if(error) {throw error;}
            return done(null, newUser);
        });    
    }
})
})); 

//para login de usuario 
passport.use('local-administrador_login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
    },
    function (req, email, password, done){
    User.findOne({'local.email': email}, function(error, user){
        if(error){ return done(error);}
        if(!user){
            return done(null, false, req.flash('loginMessage', 'El usuario no se encontro'));
        } 
        if(!user.validatePassword(password)){
return done (null, false, req.flash('loginMessage', 'la contraseña no coincide'));
        }
    return done(null , user);
    })
    })); 
}
