"use server";
import { Resend } from "resend";
import EmailTemplate from "./components/Email";
import { render } from "@react-email/render";
interface State {
  error: string | null;
  success: boolean;
}
export const sendEmail = async (prevState: State, formData: FormData) => {
  console.log(formData);
  const telefono = formData.get("telefono") as string;
  const email = "leopoldobeguiluz1@hotmail.com";
  const servicio = formData.get("servicio") as string;
  const contactemail = formData.get("email") as string;
  const message = formData.get("message") as string;
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    let response = await resend.emails.send({
      from: "Empresarial <empresarial@psicologapuebla.com.mx>",
      to: email,
      subject: "Informes de servicio empresarial",
      html: await render(
        EmailTemplate({ telefono, contactemail, message, servicio })
      ),
    });
    console.log(response);
    return {
      error: null,
      success: true,
    };
  } catch (error) {
    console.log(error);
    return {
      error: (error as Error).message,
      success: false,
    };
  }
};
