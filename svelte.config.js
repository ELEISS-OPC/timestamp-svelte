import adapter from "@sveltejs/adapter-vercel";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      images: {
        sizes: [640, 828, 1200, 1920, 3840],
        formats: ["image/avif", "image/webp"],
        minimumCacheTTL: 300,
        domains: ["timestamp-svelte.vercel.app"],
      },
    }),
  alias: {
    "$components": "src/lib/components",
    "$utils": "src/lib/utils",
    "$ui": "src/lib/components/ui",
    "$hooks": "src/lib/hooks",
    "$lib": "src/lib"
  },

  },
  vitePlugin: {
    dynamicCompileOptions: ({ filename }) =>
      filename.includes("node_modules") ? undefined : { runes: true },
  },
};

export default config;
