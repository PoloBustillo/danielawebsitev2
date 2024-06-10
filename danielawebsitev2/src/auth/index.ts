import NextAuth, { CredentialsSignin, NextAuthConfig, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { cert } from "firebase-admin/app";

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
  adapter: FirestoreAdapter({
    credential: cert({
      projectId: process.env.AUTH_FIREBASE_PROJECT_ID,
      clientEmail: process.env.AUTH_FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.AUTH_FIREBASE_PRIVATE_KEY,
    }),
  }),
};

export const { handlers, auth, signIn, signOut } = NextAuth(options);
