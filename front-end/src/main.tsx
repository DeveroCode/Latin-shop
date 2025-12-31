import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import AppRouter from "./router.tsx";
import "./index.css";

const queryClient = new QueryClient();
const strapiPromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLIC_KEY as string
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Elements stripe={strapiPromise}>
        <AppRouter />

        <ToastContainer position="top-right" />
        <ReactQueryDevtools initialIsOpen={false} />
      </Elements>
    </QueryClientProvider>
  </StrictMode>
);
