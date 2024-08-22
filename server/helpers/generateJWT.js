import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config();

const generateJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  })
}
export default generateJWT