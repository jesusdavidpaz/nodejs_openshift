const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const estudianteSchema = new mongoose.Schema({
local:{
    email:String,
    password: String
},
facebook:{
    email: String,
    password: String,
    id: String,
    token: String
},
twitter:{
    email: String,
    password: String,
    id: String,
    token: String
},

});
//cifra contrseña 
estudianteSchema.methods.generateHash = function (password){
return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
//descifra la contrseña cuando se logea
estudianteSchema.methods.validatePassword = function(password){
return bcrypt.compareSync(password, this.local.password);
};

module.exports= mongoose.model('Estudiante', estudianteSchema);