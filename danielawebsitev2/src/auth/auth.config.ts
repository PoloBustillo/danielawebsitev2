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
      console.log("trigger", trigger);
      if (trigger === "update") {
        console.log("session1", session);
        if (session) {
          token.user = session.user;
        }
      }
      console.log("jwt token", token, user);
      if (user) {
        token.sub = user.id;
        token.user = user;
      }
      return token;
    },
    session: async ({ session, token }) => {
      console.log("session", token, session);
      session.user.apellidoMaterno = (token.user as User).apellidoMaterno;
      session.user.apellidoPaterno = (token.user as User).apellidoPaterno;
      session.user.fechaNacimiento = (token.user as User).fechaNacimiento;
      session.user.celular = (token.user as User).celular;
      session.user.name = (token.user as User).name;
      session.user.role = (token.user as User).role;
      session.user.id = (token.user as User).id!.toString();
      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
