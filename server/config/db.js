import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();

const mongo = process.env.MONGO_URL

const connectDB = async () => {
  try {
    const db = await mongoose.connect(mongo, {})

    const url = `${db.connection.host}:${db.connection.port}`
    console.log(`Conectado a la db Exitosamente -> ${url} 🚀`);
  } catch (e) {
    throw new Error(`Error al intentar conectar la db: ${e.message}`);
  }
}

export default connectDB