import nodemailler from "nodemailer";
import { TypeEmail, DataTypeEmail, IEmailVerify } from "./EmailTypes";
import { HOST, PORT, PSSWD, USER } from "../config/config";
import verifyEmail from "./verify/verifyEmail";

const transport = nodemailler.createTransport({
  host: HOST,
  port: Number(PORT),
  secure: true,
  auth: {
    user: USER,
    pass: PSSWD,
  },
});

/**
 *
 * @param type Tipo de email a envia (puede ser cualquiera de los @enum de TypeEmail)
 * @param data Datos del correo, incluye nombre y correo del usuario y datos adicionales dependiendo del tipo de correo
 */
const sendEmail = async (type: TypeEmail, data: DataTypeEmail) => {
  const info = {
    from: `"ChatOnline" <${USER}>`,
    to: data.userEmail,
    subject: "",
    text: "",
    html: "",
  };
  switch (type) {
    case TypeEmail.VERIFY:
      const body = verifyEmail(data as IEmailVerify);
      info.subject = "Verifica tu correo";
      info.text = "Verifica tu correo";
      info.html = body;
      break;

    default:
      break;
  }

  await transport.sendMail(info);
};

export default sendEmail;
