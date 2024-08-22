import Veterinario from "../models/Veterinario.js"

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
    res.status(500).json({ "msg": "Error al autenticar el usuario" })
  }
}

export const auth = async (req, res) => {
  const { correo: email, password } = req.body
  try {
    const exist = await Veterinario.findOne({ email })
    if (!exist) {
      return res.status(403).json({ msg: "Correo no registrado" })
    }
    res.json({ msg: "Autenticandoo.." })
  } catch (error) {
    throw new Error(`Error al solicitar un usuario ${e}`)
  }
}

export const perfil = (req, res) => {
  res.json({ msg: "Mostrando perfil..." })
} 