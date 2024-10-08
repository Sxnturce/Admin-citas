import Veterinario from "../models/Veterinario.js"
import generateJWT from "../helpers/generateJWT.js"
import emailRegistro from "../helpers/emailRegistro.js"
import emailOlvidePassword from "../helpers/emailOlvidePassword.js"
import generateToken from "../helpers/generateToken.js"
import bcryptjs from "bcryptjs"

export const register = async (req, res) => {
  const { nombre, email } = req.body

  const exist = await Veterinario.findOne({ email }).exec()

  if (!exist) {
    try {
      const veterinario = new Veterinario(req.body)
      const saveUser = await veterinario.save()

      //Enviar email para confirmar la cuenta
      emailRegistro({
        email,
        nombre,
        token: saveUser.token
      })

      res.json(saveUser)
    } catch (e) {
      res.status(400).json({ msg: "Error al crear un usuario" })
    }
    return;
  }
  res.status(400).json({ msg: "El email ya esta verificado" })
}


export const confirmar = async (req, res) => {
  const token = req.params.token
  try {
    const user = await Veterinario.findOne({ token }).exec()
    if (!user) {
      const error = new Error("El token expiro o no es valido 😿")
      return res.status(404).json({ msg: error.message })
    }

    user.confirmado = true
    user.token = null
    await user.save()

    res.json({ msg: "Confirmado correctamente" })
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
      return res.status(404).json({ msg: "Email no registrado" })
    }

    //Comprobamos si el usuario esta confirmado
    const isAuth = user.confirmado
    if (!isAuth) {
      res.status(401).json({ msg: "El usuario no confirmo su cuenta 😔" })
      return
    }

    //Comprobamos si la password es correcta
    const pass = bcryptjs.compareSync(password, user.password)
    if (!pass) {
      return res.status(403).json({ msg: "La contraseña no es correcta" })
    }

    //Generamos un JWT con el id del usuario
    res.json({ token: generateJWT(user.id) })

  } catch (error) {
    return res.status(400).json({ msg: "Error en la autenticación" })
  }
}

export const perfil = (req, res) => {
  const { veterinario } = req
  res.json(veterinario)
}

export const forgotPass = async (req, res) => {
  const { email } = req.body
  try {
    const user = await Veterinario.findOne({ email }).exec();
    if (!user) {
      return res.status(404).json({ msg: "El correo electronico no existe" })
    }
    user.token = generateToken();
    await user.save();

    //Desestructuramos ya que para este punto el correo ya fue confirmado como existente
    const { email: Email, nombre, token } = user
    emailOlvidePassword({
      email: Email,
      nombre,
      token
    })

    //Mensaje de aviso si todo salio como lo esperado
    res.json({ msg: "Hemos enviado un email con instrucciones" })
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
    res.json({ msg: "El token fue confirmado" })
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