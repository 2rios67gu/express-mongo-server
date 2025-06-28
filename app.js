import express from "express";
import mongoose from "mongoose";
import Papa from "./models/papa.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const { MONGO_URI, PORT } = process.env;

app.use(express.json());

// Conexion con la base de datos
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Conectado a la base de datos"))
  .catch((err) => console.log("Error al conectar a la base de datos", err));

// Crear papa
app.post("/papa", async (req, res) => {
  try {
    const p = new Papa(req.body);
    const savedPapa = await p.save();
    res.status(201).json(savedPapa);
  } catch (error) {
    res.status(400).json({ message: "Error al guardar el papa", error });
  }
});

// Obtener todos los papas
app.get("/papa", async (req, res) => {
  const listPapa = await Papa.find();
  res.json(listPapa);
});

// Obtener papa por id
app.get("/papa/:id", async (req, res) => {
  try {
    const papa = await Papa.findById(req.params.id);
    if (!papa) return res.status(404).json({ error: "Papa no encontrado" });
    res.json(papa);
  } catch {
    res.status(400).json({ error: "ID no valido" });
  }
});


// Actualizar por ID
app.put("/papa/:id", async (req, res) => {
    try {
        const updatedPapa = await Papa.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedPapa) return res.status(404).json({ error: "Papa no encontrado" });
        res.json(updatedPapa);
    } catch (error) {
        res.status(400).json({ error: "Error al actualizar el papa", error });
    }
});

// Eliminar papa por id
app.delete("/papa/:id", async (req, res) => {
    try {
        const deletedPapa = await Papa.findByIdAndDelete(req.params.id);
        if (!deletedPapa) return res.status(404).json({ error: "Papa no encontrado" });
        res.json({ message: "Papa eliminado" });
    } catch (error) {
        res.status(400).json({ error: "Error al eliminar el papa", error });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
