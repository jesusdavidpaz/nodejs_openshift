module.exports = (app, passport)=> {
    
    app.get('/', (req, res) => {
    res.render('index');
    });

    app.get('/visualizar_equipos_profesor', (req, res) => {
        res.render('visualizar_equipos_profesor', {
        
    });
            });

            
        }