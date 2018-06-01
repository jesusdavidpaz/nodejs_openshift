module.exports = (app, passport)=> {
    
    app.get('/', (req, res) => {
res.render('index');
    });

    app.get('/login_profesor', (req, res) => {
        res.render('login_profesor', {
        message: req.flash('loginMessage')
    });
            });

//para el boton dentro del formulario
app.post('/login_profesor', passport.authenticate('local-login_profesor',{
    successRedirect: '/menu_profesor',   
    failureRedirect: '/login_profesor',
    failureFlash: true   
}));
//////////////////////////////////
app.get('/registro_profesor', (req, res)=>{
res.render('registro_profesor', {
    message: req.flash('registrarMessage')
});
});
//para el boton dentro del formulario
app.post('/registro_profesor', passport.authenticate('local-registro_profesor',{
 successRedirect: '/login_profesor',   
 failureRedirect: '/registro_profesor',
 failureFlash: true
}));
app.get('/maps_profesor', (req, res)=>{
    res.render('maps_profesor',{
user: req.user
    });
});
//////////////////////////////////
/*app.get('/logout', (req, res)=>{
req.logout();
res.redirect('/');
});
};
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
return next();
    }
    return res.redirect('/');
  */  
}