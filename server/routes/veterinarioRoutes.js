import express from "express"
import { register, perfil, confirmar, auth } from "../controllers/VeterinarioController.js"

const router = express.Router()

router.post("/", register)
router.post("/login", auth)

router.get("/perfil", perfil)
router.get("/confirmar/:token", confirmar)

export default router;