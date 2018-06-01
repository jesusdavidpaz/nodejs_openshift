const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = new mongoose.Schema({
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
userSchema.methods.generateHash = function (password){
return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
//descifra la contrseña cuando se logea
userSchema.methods.validatePassword = function(password){
return bcrypt.compareSync(password, this.local.password);
};

module.exports= mongoose.model('User', userSchema);