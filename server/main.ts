import { Hono } from "hono";
import { booksApp } from "./routes/books.ts";
import { serveStatic } from "hono/deno";
import { logger } from "hono/logger";
import "@std/streams";

const kv = await Deno.openKv();

const initialData = {
  books: [
    { id: 1, title: "Book 1", author: "Author 1" },
    { id: 2, title: "Book 2", author: "Author 2" },
    { id: 3, title: "Book 3", author: "Author 3" },
  ],
};

await kv.set(["books"], initialData.books);

const app = new Hono()
  .use("*", logger())
  .use("/*", serveStatic({ root: "./client/dist" }))
  .route("/api/books", booksApp);

export type AppType = typeof app;

const port = Deno.env.get("PORT") ? parseInt(Deno.env.get("PORT")!) : 8080;
Deno.serve({ port }, app.fetch);
