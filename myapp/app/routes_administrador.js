module.exports = (app, passport)=> {
    
    app.get('/', (req, res) => {
res.render('index');
    });

    app.get('/administrador_login', (req, res) => {
        res.render('administrador_login', {
        message: req.flash('loginMessage')
    });
            });

//para el boton dentro del formulario
app.post('/administrador_login', passport.authenticate('local-administrador_login',{
    successRedirect: '/menu_administrador',   
    failureRedirect: '/administrador_login',
    failureFlash: true   
}));
//////////////////////////////////
app.get('/administrador_registro', (req, res)=>{
res.render('administrador_registro', {
    message: req.flash('registrarMessage')
});
});
//para el boton dentro del formulario
app.post('/administrador_registro', passport.authenticate('local-administrador_registro',{
 successRedirect: '/administrador_login',   
 failureRedirect: '/administrador_registro',
 failureFlash: true
}));

app.get('/menu_administrador',  (req, res)=>{
    res.render('menu_administrador',{
user: req.user
    });
});

//////////////////////////////////
/*
app.get('/logout', (req, res)=>{
req.logout();
res.redirect('/index1');
});
}

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
return next();
    }
    return res.redirect('/');
 */ 
}