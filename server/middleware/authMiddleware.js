import Veterinario from "../models/Veterinario.js"
import jwt from "jsonwebtoken"

const checkAuth = async (req, res, next) => {
  //Obtenemos el JWT del header 
  const authHeader = req.header("authorization")

  //Comprobamos si hay algun y si no empieza con Bearer
  if (!authHeader) {
    return res.status(404).json({ msg: "Token inexistente" })
  } else if (!authHeader.startsWith("Bearer")) {
    return res.status(404).json({ msg: "Token inexistente" })
  }

  //Eliminamos la palabra Bearer para comprobar la validez
  const token = authHeader.replace("Bearer", "").trim()

  try {
    //Desencriptamos el jwt 
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    //Comprobamos si la id del jwt es real
    req.veterinario = await Veterinario.findById(decoded.id).select("-password -token  -confirmado")
    return next();
  } catch (e) {
    return res.status(401).json({ msg: `Token no valido: ${e}` })
  }
}

export default checkAuth