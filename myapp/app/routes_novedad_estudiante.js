module.exports = (app, passport)=> {
    
    app.get('/', (req, res) => {
    res.render('index');
    });

    app.get('/visualizar_novedades_estudiante', (req, res) => {
        res.render('visualizar_novedades_estudiante', {
        
    });
            });

            
        }