import { firebase } from "@/auth";
import EmailBlogTemplate from "@/components/EmailBlog";
import { render } from "@react-email/render";
import { NextRequest } from "next/server";
import { Resend } from "resend";

export async function GET(request: NextRequest) {
  let blogName = request.nextUrl.searchParams.get("name") || "";
  let description = request.nextUrl.searchParams.get("description") || "";

  let querySnapshot = await firebase
    .firestore()
    .collection("users")
    .where("subscripcion", "==", true)
    .get();

  await querySnapshot.forEach(async (doc) => {
    if (doc.data().email) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        let response = await resend.emails.send({
          from: "Blog <blogs@psicologapuebla.com.mx>",
          to: doc.data().email,
          subject: "Nueva entrada en el blog de Psicóloga Daniela Diaz",
          html: await render(
            EmailBlogTemplate({
              name: blogName,
              description: description,
            })
          ),
        });
      } catch (error) {
        console.log(error);
        return new Response(JSON.stringify(error), { status: 400 });
      }
    }
  });
  return new Response("OK", { status: 200 });
}
