import NextAuth, { NextAuthConfig, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const BASE_PATH = "/";

const options: NextAuthConfig = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
        token: { label: "Token", type: "text", placeholder: "Token" },
      },
      async authorize(credentials): Promise<User | null> {
        console.log("credentials", credentials);
        if (
          credentials.email === "admin@admin.com" &&
          credentials.password === "123456789"
        ) {
          return { email: credentials.email };
        }
        return null;
      },
    }),
  ],
  pages: { signIn: "/", error: "/" },

  secret: process.env.NEXTAUTH_SECRET,
};

export const { handlers, auth, signIn, signOut } = NextAuth(options);
