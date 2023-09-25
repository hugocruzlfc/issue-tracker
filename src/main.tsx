import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { worker } from "@uidotdev/react-query-api";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
    },
  },
});
//const queryClient = new QueryClient();

new Promise((res) => setTimeout(res, 100))
  .then(() =>
    worker.start({
      quiet: true,
      onUnhandledRequest: "bypass",
    })
  )
  .then(() => {
    ReactDOM.createRoot(document.getElementById("root")!).render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <div className="container">
            <App />
          </div>
        </BrowserRouter>
        <ReactQueryDevtools />
      </QueryClientProvider>
    );
  });
