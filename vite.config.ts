import { defineConfig } from "vite"
// import pugPlugin from "./src/vite-plugin-pug/index.js"
import pugPlugin from "vite-plugin-pug"

export default defineConfig({
  plugins: [
    pugPlugin(
      {
        // pretty: true,
        doctype: "html",
      },
      {}
    ),
  ],
})
