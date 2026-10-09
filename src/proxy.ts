import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySession } from "@/lib/auth/session";

/** Guards the admin area and admin API before anything renders. */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authed = await verifySession(request.cookies.get(SESSION_COOKIE)?.value);

  let response: NextResponse;
  if (pathname === "/admin/login") {
    response = authed
      ? NextResponse.redirect(new URL("/admin", request.url))
      : NextResponse.next();
  } else if (authed) {
    response = NextResponse.next();
  } else if (pathname.startsWith("/api/")) {
    response = NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  } else {
    response = NextResponse.redirect(new URL("/admin/login", request.url));
  }

  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  response.headers.set("Cache-Control", "no-store");
  return response;
}

export const config = {
  matcher: ["/admin", "/admin/:path*", "/api/admin/:path*"],
};
