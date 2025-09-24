const mongoose = require('mongoose');
const TradeSchema = new mongoose.Schema({ tradeId:{type:String,required:true,unique:true}, userId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true}, symbol:String, side:String, price:Number, quantity:Number, notional:Number, status:String, profitLoss:Number },{timestamps:true});
module.exports = mongoose.models.Trade || mongoose.model('Trade', TradeSchema);
