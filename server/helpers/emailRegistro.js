import nodemailer from "nodemailer"

async function emailRegistro(datos) {
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
    subject: "Comprueba tu cuenta en APV",
    text: "Comprueba tu cuenta en APV",
    html:/*HTML*/`
      <p>Hola <strong>${name}</strong>: Comprueba tu cuenta en APV. </p>
      <p>Tu cuenta ya esta casi lista. Solo debes comprobarla con el siguiente enlace 😎 </p>
      <a href="${process.env.FRONTEND_URL}/confirmar/${token}"><strong>Comprobar Cuenta</strong></a>
      <br>
      <br>
      <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje </p>
    `
  })
}

export default emailRegistro;