import { isValidObjectId } from "mongoose";
import Paciente from "../models/Pacientes.js"

export const addPaciente = async (req, res) => {
  const paciente = new Paciente(req.body);
  paciente.veterinario = req.veterinario._id
  try {
    const save = await paciente.save();
    res.json(save)
  } catch (e) {
    return res.status(401).json({ msg: `Error al crear el paciente: ${e}` })
  }
}

export const showPacientes = async (req, res) => {
  const { _id: veterinario } = req.veterinario
  try {
    const all = await Paciente.find({ veterinario })
    res.json(all)
  } catch (e) {
    res.status(404).json({ msg: `${e}` })
  }
}

export const mostrarPaciente = async (req, res) => {
  const { id } = req.params
  const veterinarioID = req.veterinario._id

  if (!isValidObjectId(id)) {
    return res.json({ msg: "El id no es valido" })
  }

  try {
    const paciente = await Paciente.findById({ _id: id }).where("veterinario").equals(veterinarioID).exec()

    if (!paciente) {
      return res.status(400).json({ msg: "No tienes acceso a este paciente" })
    }

    res.json(paciente)
  } catch (e) {
    res.status(404).json({ msg: `Error al solicitar un paciente: ${e}` })
  }
}

export const actualizarPaciente = async (req, res) => {
  const { nombre, propietario, sintomas, email } = req.body
  const { id } = req.params
  const veterinarioID = req.veterinario.id

  if (!isValidObjectId(id)) {
    return res.json({ msg: "El id no es valido" })
  }

  try {
    const paciente = await Paciente.findById({ _id: id }).where("veterinario").equals(veterinarioID).exec()

    if (!paciente) {
      return res.status(400).json({ msg: "No tienes acceso a este paciente" })
    }
    paciente.nombre = nombre ?? paciente.nombre
    paciente.propietario = propietario ?? paciente.propietario
    paciente.sintomas = sintomas ?? paciente.sintomas
    paciente.email = email ?? paciente.email

    await paciente.save()
    res.json(paciente)

  } catch (e) {
    res.status(404).json({ msg: `Error al solicitar un paciente: ${e}` })
  }
}

export const eliminarPaciente = async (req, res) => {
  const { id } = req.params
  const veterinarioID = req.veterinario.id

  if (!isValidObjectId(id)) {
    return res.json({ msg: "El id no es valido" })
  }

  try {
    const paciente = await Paciente.findById({ _id: id }).where("veterinario").equals(veterinarioID).exec()

    if (!paciente) {
      return res.status(400).json({ msg: "No tienes acceso a este paciente" })
    }
    await paciente.deleteOne()
    res.json({ msg: "Paciente eliminado" })
  } catch (e) {
    res.status(404).json({ msg: `Error al solicitar un paciente: ${e}` })
  }
}