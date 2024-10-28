import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth(
  function middleware(req: NextRequest) {
    // Allow the request to proceed if authorized
    return NextResponse.next();
  },
  {
    callbacks: {
      async authorized({ token }) {
        // Check if the user has the required role
        return token?.role === "admin";
      },
    },
  }
);

export const config = { matcher: ["/dashboard/:path*"] };
