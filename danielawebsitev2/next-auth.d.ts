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
      ocupacion?: string | undefined;
      sexo?: string | undefined;
      religion?: string | undefined;
      escolaridad?: string | undefined;
    } & DefaultSession["user"];
  }
  interface User {
    apellidoPaterno?: string | undefined;
    apellidoMaterno?: string | undefined;
    fechaNacimiento?: string | undefined;
    celular?: string | undefined;
    role?: string | undefined;
    ocupacion?: string | undefined;
    sexo?: string | undefined;
    religion?: string | undefined;
    escolaridad?: string | undefined;
    emailVerified?: string | undefined;
  }
}
