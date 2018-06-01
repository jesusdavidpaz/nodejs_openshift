const express = require("express");
const app= express();
const formidable = require('formidable');
const util = require('util');
const path = require('path');
const fs = require('fs');
error = null;
const mongoose = require('mongoose');
const passport = require("passport");
const flash = require("connect-flash");
const morgan = require("morgan");
const cookieParser=require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const { url } = require('./config/database');

mongoose.connect(url, {
//useMongoClient: true
});
require('./config/passport')(passport);
require('./config/passport_estudiante')(passport);
require('./config/passport_profesor')(passport);
require('./config/passport_administrador')(passport);

//Configuraciones
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middlewares
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
    secret: 'Palabra secreta',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//routes
require('./app/routes')(app, passport);
require('./app/routes_estudiante')(app, passport);
require('./app/routes_profesor')(app, passport);
require('./app/routes_administrador')(app, passport);
require('./app/routes_novedades')(app, passport);
require('./app/routes_equipos')(app, passport);
require('./app/routes_google_map')(app, passport);
require('./app/routes_novedad_estudiante')(app, passport);
require('./app/routes_equipo_estudiante')(app, passport);
require('./app/routes_novedad_profesor')(app, passport);
require('./app/routes_equipo_profesor')(app, passport);
require('./app/routes_menu_profesor')(app, passport);
require('./app/routes_menu_estudiante')(app, passport);



//static file
app.use(express.static(path.join(__dirname, 'public')));


//var mongoose = require('mongoose');

//Documentos
/////////////TABLA NOVEDADES/////////////////////////////////////////////////////////////////
var NovedadSchema = mongoose.Schema({
	nombre : String,
	sede : String,
    latitud : String,
    longitud :  String,
    fecha_hora : String,
    tipo_novedad : String,
    foto : {type : Buffer }
});
var Novedad = mongoose.model('Novedad', NovedadSchema);

app.get('/listar', function(req, res){
	var response = [];
	Novedad.find({}, function(error, novedades){		
		novedades.forEach(function(user) {
			response.push({
				id : user._id,
				nombre : user.nombre,
				sede : user.sede,
				latitud : user.latitud,
				longitud : user.longitud,
				fecha_hora : user.fecha_hora,
				tipo_novedad : user.tipo_novedad,
				foto : 'data:image/jpeg;base64,'+user.foto.toString('base64')		
			});
		});
		res.json(response || '')
   });
});

app.post('/eliminar', function(req, res){
	Novedad.remove({_id: req.query._id}, function(error){
		if(error){
			res.send('Error.');
		}else{
			res.send('Ok');
		}
   });
});

	app.post('/modificar',function(req, res){
	Novedad.findById({_id:req.query._id}, function(error, documento){
				if(error){
				  res.send('Error.');
				}else{
				  var novedad = documento;
				  novedad.nombre = req.query.nombre,
				  novedad.sede = req.query.sede,
				  novedad.latitud = req.query.latitud,
				  novedad.longitud = req.query.longitud,
				  novedad.fecha_hora = req.query.fecha_hora,
				  novedad.tipo_novedad = req.query.tipo_novedad
					 
				  novedad.save(function(error, documento){
					  if(error){
							 res.send('Error.');
					  }else{ 
							 res.send(documento);
					  }
				   });
			  }
		  });			
		});

app.get('/recuperar', function(req, res){
	Novedad.findById(req.query._id, function(error, documento){
		  if(error){
			 res.send('Error.');
		  }else{
			 res.send(documento);
		  }
   });
});

app.post('/gestion_novedades', function (req,res,next) {
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
	var img = files.foto;
		 fs.readFile(img.path, function(err, data){
			 Novedad.create({
				 
				nombre : fields.nombre,
				 sede : fields.sede,
				 latitud : fields.latitud,
				 longitud : fields.longitud,
				 fecha_hora : fields.fecha_hora,
				 tipo_novedad : fields.tipo_novedad,
				 foto : data
			 },function(err, user) {
				 if(err){
					 error = err;
					 res.redirect('/gestion_novedades');	
				 } 
				 if(user){
					 error = null;
					 res.redirect('/gestion_novedades');	     		
				 }
						
					
				
			 });

		});
	});
	
});

/////////TABLA EQUIPOS DE COMPUTO//////////////////////////////////////////////////////////////////////7
var EquipoSchema = mongoose.Schema({
	sede: String,
	nombre_sala: String,
	equipo_computo : String,
    direccion_mac : String,
    serial :  String,
    marca : String,
	codigo_inventario : String,
	descripcion : String,
    foto : {type : Buffer }
});
var Equipo = mongoose.model('Equipo', EquipoSchema);

app.get('/listar_equipo', function(req, res){
	var response = [];
	Equipo.find({}, function(error, equipos){		
		equipos.forEach(function(user) {
			response.push({
				id : user._id,
				sede : user.sede,
				nombre_sala : user.nombre_sala,
				equipo_computo : user.equipo_computo,
				direccion_mac : user.direccion_mac,
				serial : user.serial,
				marca : user.marca,
				codigo_inventario : user.codigo_inventario,
				descripcion : user.descripcion,
				foto : 'data:image/jpeg;base64,'+user.foto.toString('base64')		
			});
		});
		res.json(response || '')
   });
});

app.post('/eliminar_equipo', function(req, res){
	Equipo.remove({_id: req.query._id}, function(error){
		if(error){
			res.send('Error.');
		}else{
			res.send('Ok');
		}
   });
});

	app.post('/modificar_equipo',function(req, res){
	Equipo.findById({_id:req.query._id}, function(error, documento){
				if(error){
				  res.send('Error.');
				}else{
				  var equipo = documento;
				  equipo.sede = req.query.sede,
				  equipo.nombre_sala = req.query.nombre_sala,
				  equipo.equipo_computo = req.query.equipo_computo,
				  equipo.direccion_mac = req.query.direccion_mac,
				  equipo.serial = req.query.serial,
				  equipo.marca = req.query.marca,
				  equipo.codigo_inventario = req.query.codigo_inventario,
				  equipo.descripcion = req.query.descripcion
					 
				  equipo.save(function(error, documento){
					  if(error){
							 res.send('Error.');
					  }else{ 
							 res.send(documento);
					  }
				   });
			  }
		  });			
		});

app.get('/recuperar_equipo', function(req, res){
	Equipo.findById(req.query._id, function(error, documento){
		  if(error){
			 res.send('Error.');
		  }else{
			 res.send(documento);
		  }
   });
});

app.post('/gestion_equipos', function (req,res,next) {
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
	var img = files.foto;
		 fs.readFile(img.path, function(err, data){
			 Equipo.create({
				sede : fields.sede,
				nombre_sala : fields.nombre_sala,
				 equipo_computo : fields.equipo_computo,
				 direccion_mac : fields.direccion_mac,
				 serial : fields.serial,
				 marca : fields.marca,
				 codigo_inventario : fields.codigo_inventario,
				 descripcion : fields.descripcion,
				 foto : data
			 },function(err, user) {
				 if(err){
					 error = err;
					 res.redirect('/gestion_equipos');	
				 } 
				 if(user){
					 error = null;
					 res.redirect('/gestion_equipos');	     		
				 }
						
					
				
			 });

		});
	});
	
});
/////////CREACION USUARIOS EN ADMINISTRADOR////////////////////////////////////////////////////////////////////////////////////////
app.listen(app.get('port'), ()=>{
console.log('Corriendo por el puerto', app.get('port'));
});
