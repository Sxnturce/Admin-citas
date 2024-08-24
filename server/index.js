import express from "express"
import connectDB from "./config/db.js"
import veterinariosRoutes from "./routes/veterinarioRoutes.js"
import pacientesRouter from "./routes/pacienteRoutes.js"

//Instanciamos express
const server = express()

//Activamos el body parser para leer peticiones desde la req
server.use(express.json())

//Nos conectamos a la db
connectDB();

//Asignamos un puerto
const port = process.env.PORT || 4000

server.listen(port, () => {
  console.log(`Servidor escuchando en ${port}`);
})

//Usamos el la instancia del router para crear las rutas (veterinario) 
server.use("/api/veterinarios", veterinariosRoutes)

//Usamos la instacia de router para crear las rutas (paciente)
server.use("/api/pacientes", pacientesRouter)