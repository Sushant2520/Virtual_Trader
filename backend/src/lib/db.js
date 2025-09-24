const mongoose = require('mongoose');
const seed = require('../utils/seed');
module.exports = async function connect(){
  const uri = process.env.MONGO_URI;
  if(!uri) throw new Error('MONGO_URI not set');
  await mongoose.connect(uri);
  console.log('Mongo connected');
  try{ await seed(); }catch(e){ console.error('Seed error', e); }
};
