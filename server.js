const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/formulario")
.then(() => console.log("Conectado a MongoDB"))
.catch(err => console.log("Error MongoDB:", err));

const contactoSchema = new mongoose.Schema({
    nombre: String,
    correo: String,
    mensaje: String,
    fecha: { type: Date, default: Date.now }
});

const Contacto = mongoose.model("Contacto", contactoSchema);

app.post("/guardar", async (req, res) => {
    console.log("Datos recibidos:", req.body);

    try {
        const nuevoContacto = new Contacto({
            nombre: req.body.nombre,
            correo: req.body.correo,
            mensaje: req.body.mensaje
        });

        await nuevoContacto.save();
        res.send("Datos guardados correctamente en MongoDB");
    } catch (error) {
        console.log("Error al guardar:", error);
        res.status(500).send("Error al guardar en MongoDB");
    }
});

app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});