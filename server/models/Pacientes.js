import mongoose from "mongoose";

const pacientesSchemme = mongoose.Schema({
  nombre: {
    type: String,
    require: true
  },
  propietario: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  fecha: {
    type: Date,
    require: true,
    default: Date.now()
  },
  sintomas: {
    type: String,
    require: true
  },
  veterinario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Veterinario"
  }
}, {
  timeStamps: true
})


const Pacientes = mongoose.model("Pacientes", pacientesSchemme)

export default Pacientes; 