module.exports = (app, passport)=> {
    
    app.get('/', (req, res) => {
    res.render('index');
    });

    app.get('/menu_estudiante', (req, res) => {
        res.render('menu_estudiante', {
        
    });
            });

            
        }
        