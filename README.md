# React + Hono + Deno Full-Stack Application

A modern full-stack application built with React 19, Hono, and Deno, featuring end-to-end type safety and React Compiler optimizations.

## 🚀 Tech Stack

### Backend
- **Deno** - Modern runtime for JavaScript/TypeScript
- **Hono** - Fast, lightweight web framework for edge computing
- **TypeScript** - Full type safety across the stack

### Frontend
- **React 19.2** - Latest React with improved features
- **Vite** - Fast build tool and development server
- **React Compiler** - Automatic optimization and memoization
- **TypeScript** - Type-safe React components

### Key Features
- ✅ **End-to-end type safety** - Shared types between client and server via Hono's type inference
- ✅ **React Compiler** - Automatic performance optimizations
- ✅ **Hot Module Replacement (HMR)** - Fast development experience
- ✅ **API proxy** - Vite proxies `/api` requests to Deno server
- ✅ **No build step for server** - Deno runs TypeScript natively

## 📁 Project Structure

```
my-app/
├── client/              # Frontend React application
│   ├── src/
│   │   ├── App.tsx      # Main React component
│   │   ├── main.tsx     # React entry point
│   │   └── index.css    # Global styles
│   └── index.html       # HTML template
├── server/              # Backend API server
│   ├── main.ts          # Deno server entry point
│   └── routes/
│       └── books.ts     # Books API route
├── vite.config.ts       # Vite configuration
├── deno.json            # Deno configuration and dependencies
└── README.md            # This file
```

## 🏃 Getting Started

### Prerequisites
- [Deno](https://deno.com/) installed (v1.40+)

### Running the Application

Start both the server and client in development mode:

```bash
deno run dev
```

This will start:
- **Backend server** on `http://localhost:8080`
- **Frontend dev server** on `http://localhost:5173` (or next available port)

### Running Separately

You can also run the server and client separately:

```bash
# Terminal 1: Start the backend server
deno run dev:server

# Terminal 2: Start the frontend dev server
deno run dev:client
```

## 🔧 How It Works

The server (`server/main.ts`) exports `AppType` from the Hono app, which the client (`client/src/App.tsx`) imports to enable end-to-end type safety. The frontend uses Hono's client (`hc<AppType>("/")`) to make type-safe API calls with autocomplete and compile-time validation.

Vite proxies all `/api` requests to the Deno server on port 8080, and the React Compiler (configured via Babel plugin) automatically optimizes components by memoizing and reducing unnecessary re-renders.

## 🛠️ Development

### Adding New API Routes

1. Create a new route file in `server/routes/`:
   ```typescript
   // server/routes/example.ts
   import { Hono } from "hono";
   
   export const exampleApp = new Hono()
     .get("/", (c) => {
       return c.json({ message: "Hello from example route" });
     });
   ```

2. Add it to the main app in `server/main.ts`:
   ```typescript
   import { exampleApp } from "./routes/example.ts";
   
   const app = new Hono()
     .route("/api/books", booksApp)
     .route("/api/example", exampleApp);
   ```

3. Use it in your React components with full type safety:
   ```typescript
   const response = await client.api.example.$get();
   ```

### Type Safety

The magic of this setup is that TypeScript types flow from the server to the client:

1. Server defines routes and types
2. `AppType` is exported from `server/main.ts`
3. Client imports `AppType` and uses it with `hc<AppType>("/")`
4. All API calls are type-checked at compile time

## 📦 Dependencies

All dependencies are managed in `deno.json` using npm imports. Key packages:

- `hono` - Web framework
- `react` & `react-dom` - UI library
- `vite` & `@vitejs/plugin-react` - Build tool
- `babel-plugin-react-compiler` - React optimization

## 📝 License

MIT
