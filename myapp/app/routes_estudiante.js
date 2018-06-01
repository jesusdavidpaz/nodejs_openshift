module.exports = (app, passport)=> {
    
app.get('/', (req, res) => {
res.render('index');
    });

    app.get('/login_estudiante', (req, res) => {
        res.render('login_estudiante', {
        message: req.flash('loginMessage')
    });
            });

//para el boton dentro del formulario
app.post('/login_estudiante', passport.authenticate('local-login_estudiante',{
    successRedirect: '/menu_estudiante',   
    failureRedirect: '/login_estudiante',
    failureFlash: true   
}));
//////////////////////////////////
app.get('/registro_estudiante', (req, res)=>{
res.render('registro_estudiante', {
    message: req.flash('registrarMessage')
});
});
//para el boton dentro del formulario
app.post('/registro_estudiante', passport.authenticate('local-registro_estudiante',{
 successRedirect: '/login_estudiante',   
 failureRedirect: '/registro_estudiante',
 failureFlash: true
}));
app.get('/menu_estudiante',  (req, res)=>{
    res.render('menu_estudiante',{
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
    return res.redirect('/');*/
}