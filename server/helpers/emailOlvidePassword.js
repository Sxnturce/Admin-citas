import nodemailer from "nodemailer"

async function emailOlvidePassword(datos) {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
  const { email, nombre: name, token } = datos
  const info = transport.sendMail({
    from: "APV - Administrador de pacientes",
    to: email,
    subject: "Reestablecer Contraseña",
    text: "Reestablecer Contraseña",
    html:/*HTML*/`
      <p>Hola <strong>${name}</strong>: Ha solicitado reestablecer tu password. </p>
      <p>Tu cuenta ya esta casi lista. Solo debes comprobarla con el siguiente enlace 😎 </p>
      <a href="${process.env.FRONTEND_URL}/olvide-password/${token}"><strong>Generar password</strong></a>
      <br>
      <br>
      <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje </p>
    `
  })
}

export default emailOlvidePassword;