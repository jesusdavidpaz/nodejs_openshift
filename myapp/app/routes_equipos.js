module.exports = (app, passport)=> {
    
    app.get('/', (req, res) => {
    res.render('index');
    });

    app.get('/gestion_equipos', (req, res) => {
        res.render('gestion_equipos', {
        
    });
            });

            
        }