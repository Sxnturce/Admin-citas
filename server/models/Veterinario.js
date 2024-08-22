import mongoose from "mongoose";
import xss from "xss"
import bcryptjs from "bcryptjs"
import token from "../helpers/generateToken.js";

const veterinarioScheme = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  telefono: {
    type: String,
    default: null,
    trim: true
  },
  web: {
    type: String,
    default: null
  },
  token: {
    type: String,
    default: token()
  },
  confirmado: {
    type: Boolean,
    default: false
  }
})

veterinarioScheme.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = bcryptjs.genSaltSync(10);
  const password = xss(this.password)
  this.password = bcryptjs.hashSync(password, salt);
  next();
})

const Veterinario = mongoose.model("Veterinario", veterinarioScheme);

export default Veterinario;