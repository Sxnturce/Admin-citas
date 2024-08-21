import express from "express"
import connectDB from "./config/db.js"
import router from "./router/router.js"

//Instanciamos express
const server = express()

//Nos conectamos a la db
connectDB();

//Asignamos un puerto
const port = process.env.PORT ?? 4000

server.listen(port, () => {
  console.log(`Servidor escuchando en ${port}`);
})

//Usamos el la instancia del router para crear las rutas 
server.use("/", router)