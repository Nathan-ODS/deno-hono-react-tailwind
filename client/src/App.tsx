import { useEffect, useState } from "react";
import type { AppType } from "../../server/main.ts";
import { hc, type InferResponseType } from "hono/client";

const client = hc<AppType>("/");

function App() {
  type Books = InferResponseType<typeof client.api.books.$get>["books"];
  const [books, setBooks] = useState<Books>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await client.api.books.$get();
      const data = await response.json();
      setBooks(data.books);
    };

    fetchBooks();
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello World</h1>
      <p className="text-lg">Here are the books</p>
      <ul className="list-disc list-inside">
        {books.map((book) => (
          <li key={book.id} className="text-sm">{book.title}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
