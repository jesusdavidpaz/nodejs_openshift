module.exports = (app, passport)=> {
    
    app.get('/', (req, res) => {
    res.render('index');
    });

    app.get('/menu_profesor', (req, res) => {
        res.render('menu_profesor', {
        
    });
            });

            
        }