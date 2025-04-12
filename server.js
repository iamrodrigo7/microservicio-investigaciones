require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Importar rutas
const investigacionesRoutes = require("./routes/investigaciones");

// Usar rutas
app.use("/investigaciones", investigacionesRoutes);

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI || "mongodb://mongo:27017/universidad", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Conectado a MongoDB desde microservicio-investigaciones");
  })
  .catch((err) => {
    console.error("❌ Error al conectar a MongoDB:", err);
  });

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Microservicio de Investigaciones en funcionamiento.");
});

// Puerto
const PORT = process.env.PORT || 5002;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
