import { Hono } from "hono";
import { booksApp } from "./routes/books.ts";

const app = new Hono()
  .route("/api/books", booksApp);

export type AppType = typeof app;

Deno.serve({ port: 8080 }, app.fetch);
