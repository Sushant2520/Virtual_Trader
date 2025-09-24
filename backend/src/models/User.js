const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({ name:String, email:{type:String,unique:true,lowercase:true}, passwordHash:String, balance:{type:Number,default:10000}, role:{type:String,enum:['user','admin'],default:'user'} }, {timestamps:true});
module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
