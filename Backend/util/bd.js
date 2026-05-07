import mongoose from 'mongoose';

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) return;
  let uri = process.env.DB_URI || 'mongodb://localhost:27017/tpSyntWebTigo';
  try {
    await mongoose.connect(uri);
    isConnected = true;
    console.log('Connexion MongoDB réussie');
  } catch (err) {
    console.error('Erreur de connexion MongoDB :', err.message);
    process.exit(1);
  }
};