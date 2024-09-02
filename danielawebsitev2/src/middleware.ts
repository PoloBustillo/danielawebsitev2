import NextAuth, { User } from "next-auth";
import { NextResponse, type NextRequest } from "next/server";
import { NO_AUTHORIZED, PROTECTED_ROUTES } from "./lib/routes";
import axios from "axios";
import * as Sentry from "@sentry/nextjs";
import admin from "firebase-admin";

const { auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    error: "/",
    signIn: "/",
    signOut: "/",
  },
  callbacks: {
    authorized({ auth }) {
      const isAuthenticated = !!auth?.user;

      return isAuthenticated;
    },
    jwt: async ({ token, user, trigger, session }) => {
      if (trigger === "update") {
        if (session) {
          token.user = session.user;
        }
      }
      if (user) {
        token.sub = user.id;
        token.user = user;

        Sentry.setUser({
          email: user.email!,
          id: user.id!,
          username: user.name!,
        });
        console.log("Sentry user set");
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user.apellidoMaterno = (token.user as User).apellidoMaterno;
      session.user.apellidoPaterno = (token.user as User).apellidoPaterno;
      session.user.fechaNacimiento = (token.user as User).fechaNacimiento;
      session.user.escolaridad = (token.user as User).escolaridad;
      session.user.religion = (token.user as User).religion;
      session.user.sexo = (token.user as User).sexo;
      session.user.ocupacion = (token.user as User).ocupacion;
      session.user.celular = (token.user as User).celular;
      session.user.name = (token.user as User).name;
      session.user.image = (token.user as User).image;
      session.user.role = (token.user as User).role;
      session.user.id = (token.user as User).id!.toString();
      return session;
    },
  },
  providers: [],
});

export default auth(async (req) => {
  const { nextUrl } = req;
  const isAuthenticated = !!req.auth;

  const isProtectedRoute = nextUrl.pathname.includes(PROTECTED_ROUTES);

  if (!isAuthenticated && isProtectedRoute)
    return Response.redirect(new URL(NO_AUTHORIZED, nextUrl));

  if (req.nextUrl.pathname.startsWith("/protected/tareas/")) {
    let tareaId = req.nextUrl.pathname.split("/tareas/")[1];

    //TODO: user has tarea
    if (req.auth?.user?.id != tareaId) {
      // return Response.redirect(new URL(NO_AUTHORIZED, nextUrl));
    }
  }

  if (req.nextUrl.pathname.startsWith("/api/citas/")) {
    let data = JSON.stringify({
      company: "psicdaniela",
      login: "admin",
      password: process.env.SIMPLY_BOOK_KEY,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://user-api-v2.simplybook.me/admin/auth",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    let response = await axios.request(config);
    const requestHeaders = new Headers(req.headers);
    const responseData = response.data;
    requestHeaders.set("x-simplybook-token", responseData?.token!);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }
});

export const config = {
  matcher: [
    "/((?!_next/static|api|_next/image|public/|favicon.ico|robots.txt|sitemap.xml|manifest.json|../public).*)",
    "/api/citas/:path*",
    "/protected/tareas/:path*",
  ],
};
