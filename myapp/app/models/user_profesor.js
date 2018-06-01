const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const profesorSchema = new mongoose.Schema({
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
profesorSchema.methods.generateHash = function (password){
return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
//descifra la contrseña cuando se logea
profesorSchema.methods.validatePassword = function(password){
return bcrypt.compareSync(password, this.local.password);
};

module.exports= mongoose.model('Profesor', profesorSchema);