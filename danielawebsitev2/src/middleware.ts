import NextAuth from "next-auth";
import { NO_AUTHORIZED, PROTECTED_ROUTES } from "./lib/routes";
const { auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    error: "/",
    signIn: "/",
    signOut: "/",
  },
  callbacks: {
    authorized({ auth }) {
      const isAuthenticated = !!auth?.user;

      return isAuthenticated;
    },
  },
  providers: [],
});

export default auth((req) => {
  const { nextUrl } = req;
  const isAuthenticated = !!req.auth;

  const isProtectedRoute = nextUrl.pathname.includes(PROTECTED_ROUTES);

  if (!isAuthenticated && isProtectedRoute)
    return Response.redirect(new URL(NO_AUTHORIZED, nextUrl));
});

export const config = {
  matcher: [
    "/((?!_next/static|api|_next/image|public/|favicon.ico|robots.txt|sitemap.xml|manifest.json|../public).*)",
  ],
};
