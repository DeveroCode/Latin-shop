import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "../config/db";
import Category from "../Models/Category";

dotenv.config();

const categories = [
  { name: "ropa para dama" },
  { name: "ropa para caballero" },
  { name: "calzado para dama" },
  { name: "calzado para caballero" },
  { name: "bolsas y accesorios" },
  { name: "perfumes y fragancias" },
  { name: "cuidado de la piel" },
  { name: "maquillaje" },
  { name: "relojes y joyería" },
  { name: "ofertas y rebajas" },
];

const seedCategories = async () => {
  try {
    await connectDB();

    await Category.deleteMany();
    console.log("🧹 Categorías anteriores eliminadas.");

    await Category.insertMany(categories);
    console.log("🌱 Categorías iniciales insertadas correctamente.");

    mongoose.connection.close();
    console.log("✅ Conexión cerrada.");
  } catch (error) {
    console.error("❌ Error al ejecutar el seeder:", error);
    process.exit(1);
  }
};

seedCategories();
