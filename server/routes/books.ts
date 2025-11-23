import { Hono } from "hono";

export type Book = {
  id: number;
  title: string;
  author: string;
};

const kv = await Deno.openKv();

export const booksApp = new Hono()
  .get("/", async (c) => {
    try {
      const booksEntry = await kv.get<Book[]>(["books"]);

      if (!booksEntry.value || booksEntry.value.length === 0) {
        return c.json({ error: "Books not found" }, 404);
      }

      return c.json({ books: booksEntry.value });
    } catch (error) {
      return c.json({
        error: `Internal server error: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      }, 500);
    }
  });
