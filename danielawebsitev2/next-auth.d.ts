// @types\next-auth.d.ts
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      apellidoPaterno?: string | undefined;
      apellidoMaterno?: string | undefined;
      fechaNacimiento?: string | undefined;
      celular?: string | undefined;
      role?: string | undefined;
    } & DefaultSession["user"];
  }
  interface User {
    apellidoPaterno?: string | undefined;
    apellidoMaterno?: string | undefined;
    fechaNacimiento?: string | undefined;
    celular?: string | undefined;
    role?: string | undefined;
    emailVerified?: string | undefined;
  }
}
