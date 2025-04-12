const express = require("express");
const mongoose = require("mongoose");
const Investigacion = require("../models/Investigacion");
const Investigador = require("../models/Investigador");
const Facultad = require("../models/Facultad");

const router = express.Router();

// ✅ Obtener todas las investigaciones
router.get("/", async (req, res) => {
    try {
        const investigaciones = await Investigacion.find()
            .populate("facultad", "nombre siglas carreras decano telefono correo")
            .populate("investigador_principal", "nombres apellidos correo area_cientifica")
            .populate("equipo_investigacion", "nombres apellidos correo area_cientifica");

        res.json(investigaciones);
    } catch (error) {
        console.error("❌ Error al obtener investigaciones:", error);
        res.status(500).json({ mensaje: "Error al obtener investigaciones", error });
    }
});

// ✅ Obtener una investigación por ID
router.get("/:id", async (req, res) => {
    try {
        const investigacion = await Investigacion.findById(req.params.id)
            .populate("facultad", "nombre siglas carreras decano telefono correo")
            .populate("investigador_principal", "nombres apellidos correo area_cientifica")
            .populate("equipo_investigacion", "nombres apellidos correo area_cientifica");

        if (!investigacion) {
            return res.status(404).json({ mensaje: "Investigación no encontrada" });
        }

        res.json(investigacion);
    } catch (error) {
        console.error("❌ Error al obtener la investigación:", error);
        res.status(500).json({ mensaje: "Error al obtener la investigación", error });
    }
});

// ✅ Crear una nueva investigación
router.post("/", async (req, res) => {
    try {
        const {
            titulo,
            anio,
            duracion_meses,
            facultad,
            investigador_principal,
            equipo_investigacion
        } = req.body;

        // Validar facultad
        const facultadExiste = await Facultad.findById(facultad);
        if (!facultadExiste) {
            return res.status(400).json({ mensaje: "La facultad no existe" });
        }

        // Validar investigador principal
        const investigadorExiste = await Investigador.findById(investigador_principal);
        if (!investigadorExiste) {
            return res.status(400).json({ mensaje: "El investigador principal no existe" });
        }

        // Validar equipo de investigación
        for (const id of equipo_investigacion) {
            const investigador = await Investigador.findById(id);
            if (!investigador) {
                return res.status(400).json({ mensaje: `El investigador con ID ${id} no existe` });
            }
        }

        const nuevaInvestigacion = new Investigacion({
            titulo,
            anio,
            duracion_meses,
            facultad,
            investigador_principal,
            equipo_investigacion
        });

        await nuevaInvestigacion.save();
        res.status(201).json(nuevaInvestigacion);
    } catch (error) {
        console.error("❌ Error al crear la investigación:", error);
        res.status(500).json({ mensaje: "Error creando la investigación", error });
    }
});

// ✅ Actualizar una investigación
router.put("/:id", async (req, res) => {
    try {
        const investigacionActualizada = await Investigacion.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!investigacionActualizada) {
            return res.status(404).json({ mensaje: "Investigación no encontrada" });
        }

        res.json(investigacionActualizada);
    } catch (error) {
        console.error("❌ Error al actualizar la investigación:", error);
        res.status(500).json({ mensaje: "Error al actualizar la investigación", error });
    }
});

// ✅ Eliminar una investigación
router.delete("/:id", async (req, res) => {
    try {
        const investigacionEliminada = await Investigacion.findByIdAndDelete(req.params.id);
        if (!investigacionEliminada) {
            return res.status(404).json({ mensaje: "Investigación no encontrada" });
        }

        res.json({ mensaje: "Investigación eliminada correctamente" });
    } catch (error) {
        console.error("❌ Error al eliminar la investigación:", error);
        res.status(500).json({ mensaje: "Error al eliminar la investigación", error });
    }
});

module.exports = router;
