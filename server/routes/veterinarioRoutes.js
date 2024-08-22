import express from "express"
import {
  register,
  perfil,
  confirmar,
  auth,
  forgotPass,
  comprobarToken,
  newPass
} from "../controllers/VeterinarioController.js"
import checkAuth from "../middleware/authMiddleware.js"

const router = express.Router()

//Public
router.post("/", register)
router.get("/confirmar/:token", confirmar)
router.post("/login", auth)
router.post("/olvide-password", forgotPass)
router.route("/olvide-password/:token").get(comprobarToken).post(newPass)

//Private
router.get("/perfil", checkAuth, perfil)

export default router;