import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;

  // თუ user-ი ხელმოწერილია და sign-in/sign-up-ზე ცდილობს შესვლას
  if (accessToken && (pathname === "/sign-in" || pathname === "/sign-up")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Protected routes - დაშუშვება მხოლოდ ხელმოწერილი users-ისთვის
  if (
    !accessToken &&
    (pathname === "/dashboard" || pathname === "/change-password")
  ) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/sign-in", "/sign-up", "/dashboard", "/change-password"],
};
