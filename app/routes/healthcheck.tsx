// learn more: https://fly.io/docs/reference/configuration/#services-http_checks
import type { LoaderFunctionArgs } from "@remix-run/node";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    return new Response("OK");
  } catch (error: unknown) {
    console.log("healthcheck ❌", { error });
    return new Response("ERROR", { status: 500 });
  }
};
