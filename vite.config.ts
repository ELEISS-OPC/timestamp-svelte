import tailwindcss from "@tailwindcss/vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  ssr: {
    // This tells Vite to bundle dagre into the output instead of
    // letting Vercel's Node environment try to resolve it.
    noExternal: ["@dagrejs/dagre"],
  },
});
