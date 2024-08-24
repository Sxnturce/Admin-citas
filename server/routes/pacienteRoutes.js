import express, { Router } from "express"
import { addPaciente, showPacientes, mostrarPaciente, actualizarPaciente, eliminarPaciente } from "../controllers/pacienteController.js"
import checkAuth from "../middleware/authMiddleware.js"

const router = express.Router()


router.route("/")
  .post(checkAuth, addPaciente)
  .get(checkAuth, showPacientes)

router.route("/:id")
  .get(checkAuth, mostrarPaciente)
  .put(checkAuth, actualizarPaciente)
  .delete(checkAuth, eliminarPaciente)

export default router