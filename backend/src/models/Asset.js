const mongoose = require('mongoose');
const AssetSchema = new mongoose.Schema({ symbol:{type:String,unique:true}, type:String, name:String });
module.exports = mongoose.models.Asset || mongoose.model('Asset', AssetSchema);
