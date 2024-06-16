import type { NextAuthConfig } from "next-auth";

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
    async jwt({ token, account, profile }) {
      return token;
    },
    async session({ session, token, user }) {
      session.user.id = token.sub!;
      return session;
    },
    authorized({ auth }) {
      const isAuthenticated = !!auth?.user;
      return isAuthenticated;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
