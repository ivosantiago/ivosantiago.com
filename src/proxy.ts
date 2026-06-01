import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Gate every /b/* path at the network boundary so unauthenticated requests
// are rejected with 401 before any function runs or a blob is fetched.
export const config = { matcher: ["/b/:path*"] };

// Length-independent comparison to avoid leaking credential length/content via timing.
function safeEqual(a: string, b: string) {
  const ea = new TextEncoder().encode(a);
  const eb = new TextEncoder().encode(b);
  let diff = ea.length ^ eb.length;
  for (let i = 0; i < Math.max(ea.length, eb.length); i++) {
    diff |= (ea[i] ?? 0) ^ (eb[i] ?? 0);
  }
  return diff === 0;
}

function unauthorized() {
  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Private", charset="UTF-8"',
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}

export function proxy(req: NextRequest) {
  const header = req.headers.get("authorization");
  if (!header?.startsWith("Basic ")) return unauthorized();

  let decoded = "";
  try {
    decoded = atob(header.slice(6));
  } catch {
    return unauthorized();
  }

  // Basic Auth always carries a username field, but this site has a single user
  // (the owner), so we ignore the username and check only the password.
  const sep = decoded.indexOf(":");
  if (sep === -1) return unauthorized();
  const pass = decoded.slice(sep + 1);

  const expectedPass = process.env.PRIVATE_PDF_PASS ?? "";

  // safeEqual always runs (flat timing); fail closed if the password isn't configured.
  if (!expectedPass || !safeEqual(pass, expectedPass)) {
    return unauthorized();
  }

  return NextResponse.next();
}
