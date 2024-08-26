import express from "express"
import cors from "cors"
import connectDB from "./config/db.js"
import veterinariosRoutes from "./routes/veterinarioRoutes.js"
import pacientesRouter from "./routes/pacienteRoutes.js"

//Instanciamos express
const server = express()

//Activamos el body parser para leer peticiones desde la req
server.use(express.json())

//Nos conectamos a la db
connectDB();

//Asignamos cors para permitir la conexion de url y con el backend
const dominiosAdd = [`${process.env.FRONTEND_URL}`]

const corsOptions = {
  origin: function (origin, cb) {
    if (dominiosAdd.indexOf(origin) !== -1) {
      cb(null, true);
    } else {
      cb(new Error("No permitido por cors"))
    }
  }
}

server.use(cors(corsOptions))

//Asignamos un puerto
const port = process.env.PORT || 4000

server.listen(port, () => {
  console.log(`Servidor escuchando en ${port}`);
})

//Usamos el la instancia del router para crear las rutas (veterinario) 
server.use("/api/veterinarios", veterinariosRoutes)

//Usamos la instacia de router para crear las rutas (paciente)
server.use("/api/pacientes", pacientesRouter)