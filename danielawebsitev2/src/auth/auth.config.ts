import type { NextAuthConfig, Session, User } from "next-auth";

export const authConfig = {
  session: {
    strategy: "jwt",
  },
  pages: {
    error: "/",
    signIn: "/",
    signOut: "/",
  },
  callbacks: {
    jwt: async ({ token, user, trigger, session }) => {
      console.log("session", session);
      console.log("trigger", trigger);
      if (trigger === "update") {
        if (session) {
          console.log("session", session);
          token.user = session.user;
        }
      }
      if (user) {
        token.sub = user.id;
        token.user = user;
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
} satisfies NextAuthConfig;
