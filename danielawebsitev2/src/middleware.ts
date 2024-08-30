import NextAuth from "next-auth";
import { NextResponse, type NextRequest } from "next/server";
import { NO_AUTHORIZED, PROTECTED_ROUTES } from "./lib/routes";
import axios from "axios";
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

export async function middleware(request: NextRequest) {
  // Ensure correct parameters and context
  if (request.nextUrl.pathname.startsWith("/api/citas/")) {
    let data = JSON.stringify({
      company: "psicdaniela",
      login: "admin",
      password: process.env.SIMPLY_BOOK_KEY,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://user-api-v2.simplybook.me/admin/auth",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    let response = await axios.request(config);

    console.log(JSON.stringify(response.data));
    const requestHeaders = new Headers(request.headers);
    const responseData = response.data;
    requestHeaders.set("x-simplybook-token", responseData?.token!);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    // This logic is only applied to /dashboard
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|api|_next/image|public/|favicon.ico|robots.txt|sitemap.xml|manifest.json|../public).*)",
    "/api/citas/:path*",
  ],
};
