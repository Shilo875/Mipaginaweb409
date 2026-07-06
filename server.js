const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// Definir esquema
const contactoSchema = new mongoose.Schema({
    nombre: String,
    correo: String,
    mensaje: String,
    fecha: { type: Date, default: Date.now }
});

const Contacto = mongoose.model("Contacto", contactoSchema);

// Ruta para guardar datos
app.post("/guardar", async (req, res) => {
    const nuevoContacto = new Contacto({
        nombre: req.body.nombre,
        correo: req.body.correo,
        mensaje: req.body.mensaje
    });

    await nuevoContacto.save();
    res.send("Datos guardados correctamente en MongoDB");
});

// Iniciar servidor
app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});