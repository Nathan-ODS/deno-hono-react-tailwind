import { Hono } from "hono";
import { booksApp } from "./routes/books.ts";
import { serveStatic } from "hono/deno";

const app = new Hono()
  .route("/api/books", booksApp)
  .use("/*", serveStatic({ root: "./client/dist" }));

export type AppType = typeof app;

const port = Deno.env.get("PORT") ? parseInt(Deno.env.get("PORT")!) : 8080;
Deno.serve({ port }, app.fetch);
