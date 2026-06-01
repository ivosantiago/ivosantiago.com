// Uploads a local PDF to Vercel Blob private storage. Run once per PDF:
//   node --env-file=.env.local scripts/upload-private-pdf.mjs <name> <path-to.pdf>
// The PDF then becomes available (behind the password) at /b/<name>.
import { put } from "@vercel/blob";
import { readFile } from "node:fs/promises";

const [name, localPath] = process.argv.slice(2);
if (!name || !localPath) {
  throw new Error("usage: <name> <path-to.pdf>");
}
if (!/^[a-z0-9-]{1,64}$/i.test(name)) {
  throw new Error("name must match [a-z0-9-]{1,64}");
}

const blob = await put(`private/${name}.pdf`, await readFile(localPath), {
  access: "private", // requires Blob Private Storage enabled on the store
  addRandomSuffix: false, // deterministic pathname → served at /b/<name>
  contentType: "application/pdf",
  token: process.env.BLOB_READ_WRITE_TOKEN,
});

console.log(`Uploaded. Available at /b/${name}`);
console.log(`Blob url: ${blob.url}`);
console.log(
  "Set PRIVATE_BLOB_BASE_URL to everything before /private/... in that url.",
);
