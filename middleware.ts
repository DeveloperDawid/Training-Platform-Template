import { updateSession } from "@/lib/supabase/middleware";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Use the existing updateSession function which handles all the Supabase logic
  const response = await updateSession(request);

  // Additional check for /home/* routes - must be authenticated
  if (request.nextUrl.pathname.startsWith("/home")) {
    // If updateSession already redirected to login, that means user is not authenticated
    if (response.headers.get("location")?.includes("/auth/login")) {
      // Add the 'next' parameter to redirect back after login
      const url = new URL(response.headers.get("location")!);
      url.searchParams.set("next", request.nextUrl.pathname);
      return NextResponse.redirect(url);
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
