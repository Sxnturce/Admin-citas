import express from "express"
import { viewIndex } from "../controllers/vistasClient.js"

const router = express.Router()

router.get("/", viewIndex)

export default router