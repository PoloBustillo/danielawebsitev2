import NextAuth, { NextAuthConfig, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import TwitterProvider from "next-auth/providers/twitter";
import FacebookProvider from "next-auth/providers/facebook";
import { FirestoreAdapter, initFirestore } from "@auth/firebase-adapter";
import { cert } from "firebase-admin/app";

export const BASE_PATH = "/";

const options: NextAuthConfig = {
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
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
        console.log(
          "credentials",
          credentials,
          process.env.AUTH_FIREBASE_PROJECT_ID
        );

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
  callbacks: {
    // signIn: async ({ user, account }) => {
    //   // const { error } = user; // Defined by google provider profile callback
    //   console.log("CALBACK", user);
    //   console.log("CALBACK", account);
    //   // if (!error) return true; // User is good to go
    //   // switch (account?.provider) {
    //   //   case "google":
    //   //   default:
    //   //     return `/signin?error=ZXZX`; // This is where you set your error
    //   // }
    //   return true;
    // },
    jwt: async ({ token, user }) => {
      console.log("jwt", token, user);
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: { signIn: BASE_PATH, error: BASE_PATH },
  secret: process.env.NEXTAUTH_SECRET,
  adapter: FirestoreAdapter({
    credential: cert({
      projectId: process.env.AUTH_FIREBASE_PROJECT_ID,
      clientEmail: process.env.AUTH_FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.AUTH_FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
    }),
  }),
};

export const { handlers, auth, signIn, signOut } = NextAuth(options);
