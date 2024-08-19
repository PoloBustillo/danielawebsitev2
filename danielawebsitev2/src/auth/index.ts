import NextAuth, { NextAuthConfig, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import TwitterProvider from "next-auth/providers/twitter";
import SpotifyProvider from "next-auth/providers/spotify";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { randomUUID } from "crypto";
import { cert } from "firebase-admin/app";
import admin from "firebase-admin";
import { authConfig } from "./auth.config";
import bcrypt from "bcrypt";

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
      clientId: process.env.SPOTIFY_CLIENT,
      clientSecret: process.env.SPOTIFY_SECRET,
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
        const db = admin.firestore();
        if (credentials.isSignup == "true") {
          let query = db
            .collection("users")
            .where("email", "==", credentials.email);
          let querySnapshot = await query.get();
          querySnapshot.forEach((documentSnapshot) => {
            throw new Error("Usuario ya existe");
          });

          const hashedPassword = await bcrypt.hash(
            String(credentials.password),
            10
          );
          let userID = randomUUID();
          let user = {
            email: credentials.email,
            password: hashedPassword,
            id: userID,
            role: "user",
          };
          let account = {
            provider: "credentials",
            user: userID,
          };

          db.collection("users").doc(userID).set(user);
          db.collection("accounts").doc().set(account);
          return { email: String(credentials.email) };
        } else {
          let query = db
            .collection("users")
            .where("email", "==", credentials.email);
          let querySnapshot = await query.get();
          let password;
          let user: User = {
            name: undefined,
            apellidoPaterno: undefined,
            fechaNacimiento: undefined,
            apellidoMaterno: undefined,
            celular: undefined,
            id: undefined,
            role: undefined,
            email: undefined,
          };
          querySnapshot.forEach(async (documentSnapshot) => {
            user = documentSnapshot.data() as User;
            password = documentSnapshot.data().password as string;
          });
          let matchedPassword = await bcrypt.compare(
            String(credentials.password),
            String(password)
          );
          if (matchedPassword) {
            return {
              email: String(credentials.email),
              name: user.name,
              apellidoPaterno: user.apellidoPaterno,
              fechaNacimiento: user.fechaNacimiento,
              apellidoMaterno: user.apellidoMaterno,
              celular: user.celular,
              id: user.id,
              role: user.role,
            };
          }
        }
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  adapter: FirestoreAdapter(config),
};

export const { handlers, auth, signIn, signOut } = NextAuth(options);
