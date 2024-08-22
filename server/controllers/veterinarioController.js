import Veterinario from "../models/Veterinario.js"
import generateJWT from "../helpers/generateJWT.js"
import generateToken from "../helpers/generateToken.js"
import bcryptjs from "bcryptjs"

export const register = async (req, res) => {
  const { nombre, email, password, token } = req.body

  const exist = await Veterinario.findOne({ email }).exec()

  if (!exist) {
    try {
      const veterinario = new Veterinario(req.body)
      const saveUser = await veterinario.save()
      res.json(saveUser)
    } catch (e) {
      res.status(400).json({ msg: "Error al crear un usuario" })
    }
    return;
  }
  res.status(400).json({ msg: "Error el usuario ya existe" })
}


export const confirmar = async (req, res) => {
  const token = req.params.token
  try {
    const user = await Veterinario.findOne({ token }).exec()
    if (!user) {
      const error = new Error("El token no es valido 😿")
      return res.status(404).json({ msg: error.message })
    }

    user.confirmado = true
    user.token = null
    await user.save()

    res.json({ msg: user })
  } catch (e) {
    res.status(500).json({ msg: "Error al autenticar el usuario" })
  }
}

export const auth = async (req, res) => {
  const { correo: email, password } = req.body
  try {
    //Comprobamos si correo existe
    const user = await Veterinario.findOne({ email }).exec();
    if (!user) {
      return res.status(404).json({ msg: "Correo no registrado" })
    }

    //Comprobamos si el usuario esta confirmado
    const isAuth = user.confirmado
    if (!isAuth) {
      res.status(403).json({ msg: "El usuario no confirmo su cuenta 😔" })
      return
    }

    //Comprobamos si la password es correcta
    const pass = bcryptjs.compareSync(password, user.password)
    if (!pass) {
      return res.status(403).json("La contraseña no es correcta")
    }

    //Generamos un JWT con el id del usuario
    res.json({ token: generateJWT(user.id) })

  } catch (error) {
    return res.status(403).json(`Error en la autenticación ${error}`)
  }
}

export const perfil = (req, res) => {
  const { veterinario } = req
  res.json({ perfil: veterinario })
}

export const forgotPass = async (req, res) => {
  const { email } = req.body
  try {
    const user = await Veterinario.findOne({ email }).exec();
    if (!user) {
      return res.status(404).json({ msg: "El correo electronico no existe" })
    }
    user.token ??= generateToken();
    await user.save();

    res.json({ user })
  } catch (e) {
    return res.status(400).json({ msg: "Error al solicitar el usuario" })
  }
}

export const comprobarToken = async (req, res) => {
  const { token } = req.params
  try {
    const user = await Veterinario.findOne({ token }).exec()
    if (!user) {
      return res.status(404).json({ msg: "El token no  existe" })
    }
    res.json({ user })
  } catch (e) {
    return res.status(400).json({ msg: "Error token no valido" })
  }
}

export const newPass = async (req, res) => {
  const { token } = req.params
  const { password } = req.body

  const veterinario = await Veterinario.findOne({ token }).exec()

  if (!veterinario) {
    return res.status(404).json({ msg: "El token no existe" })
  }

  veterinario.password = password
  veterinario.token = null
  await veterinario.save()
  res.json({ msg: "Contraseña cambiada exitosamente" })
}