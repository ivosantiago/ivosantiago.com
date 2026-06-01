// Streams a private PDF from Vercel Blob. Only reachable after src/proxy.ts has
// authenticated the request, so no auth logic is needed here.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ doc: string }> },
) {
  const { doc } = await ctx.params;
  const base = process.env.PRIVATE_BLOB_BASE_URL;
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!base || !token) {
    return new Response("Not configured", { status: 500 });
  }

  // Restrict the name so it maps to exactly one blob (no path traversal / odd input).
  if (!/^[a-z0-9-]{1,64}$/i.test(doc)) {
    return new Response("Not found", { status: 404 });
  }

  const upstream = await fetch(`${base}/private/${doc}.pdf`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!upstream.ok || !upstream.body) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(upstream.body, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${doc}.pdf"`,
      "Cache-Control": "private, no-store, max-age=0",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
