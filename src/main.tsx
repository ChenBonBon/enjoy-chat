import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import GlobalStyle from "./components/GlobalStyle.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalStyle />
    <Suspense>
      <BrowserRouter>
        <Theme>
          <App />
        </Theme>
      </BrowserRouter>
    </Suspense>
  </React.StrictMode>
);
