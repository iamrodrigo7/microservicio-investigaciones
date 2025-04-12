const mongoose = require("mongoose");

const InvestigadorSchema = new mongoose.Schema({
    nombres: { type: String, required: true },
    apellidos: { type: String, required: true },
    telefono: { type: String },
    celular: { type: String },
    correo: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, "Correo inválido"]
    },
    direccion: { type: String },
    municipio_nacimiento: { type: String },
    departamento_nacimiento: { type: String },
    fecha_nacimiento: { type: Date },
    cui: { type: String },
    pasaporte: { type: String },
    rol: {
        type: String,
        required: true,
        enum: ["estudiante", "investigador", "docente"]
    },
    facultades: [{ type: mongoose.Schema.Types.ObjectId, ref: "Facultad" }],
    area_cientifica: { type: String },
    titulos: [{
        grado: String,
        universidad: String,
        anio: Number
    }]
}, { collection: "investigadores" });

module.exports = mongoose.model("Investigador", InvestigadorSchema);
