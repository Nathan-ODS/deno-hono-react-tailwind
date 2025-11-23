import { useEffect, useState } from "react";
import type { AppType } from "../../server/main.ts";
import { hc } from "hono/client";
import type { Book } from "../../server/routes/books.ts";

const client = hc<AppType>("/");

function App() {
  const [books, setBooks] = useState<Book[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await client.api.books.$get();
        const data = await response.json();

        if ("books" in data) {
          setBooks(data.books);
        } else {
          setError(data.error);
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello World</h1>
      <p className="text-lg">Here are the books</p>
      {error && <p className="text-red-500">{error}</p>}
      {books && (
        <ul className="list-disc list-inside">
          {books.map((book) => (
            <li key={book.id} className="text-sm">{book.title}</li>
          ))}
        </ul>
      )}
    </>
  );
}

export default App;
