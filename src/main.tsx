import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ZeroProvider } from "@rocicorp/zero/react";
import { Zero } from "@rocicorp/zero";
import { schema } from "./schema.ts";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);
const {
  data: { user },
} = await supabase.auth.getUser();

const userID = user?.id ?? "anon";

const z = new Zero({
  userID,
  auth: userID,
  server: import.meta.env.VITE_PUBLIC_SERVER,
  schema,
  // This is often easier to develop with if you're frequently changing
  // the schema. Switch to 'idb' for local-persistence.
  kvStore: "mem",
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ZeroProvider zero={z}>
      <App />
    </ZeroProvider>
  </StrictMode>
);
