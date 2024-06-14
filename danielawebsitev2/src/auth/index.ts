import NextAuth, { NextAuthConfig, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import TwitterProvider from "next-auth/providers/twitter";
import SpotifyProvider from "next-auth/providers/spotify";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { cert } from "firebase-admin/app";
import admin from "firebase-admin";
import { authConfig } from "./auth.config";
import { getFirestore } from "firebase/firestore";

const config = {
  credential: cert({
    projectId: process.env.AUTH_FIREBASE_PROJECT_ID,
    clientEmail: process.env.AUTH_FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.AUTH_FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
  }),
};

export const firebase = admin.apps.length
  ? admin.app()
  : admin.initializeApp(config);

export const BASE_PATH = "/";

const options: NextAuthConfig = {
  ...authConfig,
  providers: [
    SpotifyProvider({
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
        passwordConfirmation: {
          label: "Password Confirmation",
          type: "password",
          placeholder: "Password Confirmation",
        },
        isSignup: {
          type: "boolean",
        },
      },
      async authorize(credentials): Promise<User | null> {
        // const db = getFirestore(firebase);
        if (credentials.isSignup == "true") {
          // firebase.firestore().collection("users").add({}, credentials);
        }
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
  secret: process.env.NEXTAUTH_SECRET,
  adapter: FirestoreAdapter(config),
};

export const { handlers, auth, signIn, signOut } = NextAuth(options);
