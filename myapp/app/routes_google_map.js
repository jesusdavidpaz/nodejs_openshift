module.exports = (app, passport)=> {
    
    app.get('/', (req, res) => {
    res.render('index');
    });

    app.get('/google_maps', (req, res) => {
        res.render('google_maps', {
        
    });
            });

            
        }