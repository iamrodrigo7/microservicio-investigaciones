const mongoose = require("mongoose");

const InvestigacionSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  anio: { type: Number, required: true },
  duracion_meses: { type: Number, required: true },
  facultad: { type: mongoose.Schema.Types.ObjectId, ref: "Facultad", required: true },
  investigador_principal: { type: mongoose.Schema.Types.ObjectId, ref: "Investigador", required: true },
  equipo_investigacion: [{ type: mongoose.Schema.Types.ObjectId, ref: "Investigador" }]
}, { collection: "investigaciones" });

module.exports = mongoose.model("Investigacion", InvestigacionSchema);
