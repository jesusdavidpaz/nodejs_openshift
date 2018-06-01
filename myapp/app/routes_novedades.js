module.exports = (app, passport)=> {
    
    app.get('/', (req, res) => {
    res.render('index');
    });

    app.get('/gestion_novedades', (req, res) => {
        res.render('gestion_novedades', {
        
    });
            });

            
        }