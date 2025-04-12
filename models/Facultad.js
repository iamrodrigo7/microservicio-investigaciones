const mongoose = require("mongoose");

const FacultadSchema = new mongoose.Schema({
    nombre: { type: String, required: true, unique: true },
    siglas: { type: String, required: true, unique: true },
    carreras: [{ type: String, required: true }],
    decano: { type: String, required: true },
    telefono: {
        type: String,
        required: true,
        match: [/^\d{8}$/, "El teléfono debe tener 8 dígitos"],
    },
    correo: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, "Correo inválido"],
    }
}, { collection: "facultades" });  // 👈 Fuerza el nombre de la colección

module.exports = mongoose.model("Facultad", FacultadSchema);
