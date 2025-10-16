
  import { createRoot } from "react-dom/client";
  import App from "./App.tsx";
  import { ThemeProvider } from "./contexts/ThemeContext.tsx";
  import { Providers } from "./providers.tsx";
  import { ErrorBoundary } from "./components/ErrorBoundary.tsx";
  import "./index.css";

  createRoot(document.getElementById("root")!).render(
    <ErrorBoundary>
      <ThemeProvider>
        <Providers>
          <App />
        </Providers>
      </ThemeProvider>
    </ErrorBoundary>
  );
  