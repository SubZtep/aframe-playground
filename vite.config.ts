import { defineConfig } from "vite"
// import pugPlugin from "./src/vite-plugin-pug/index.js"
// @ts-ignore
import Pug from "vite-plugin-pug/dist/index.cjs"
import Linker from "vite-plugin-linker"

export default defineConfig({
  plugins: [
    Pug(
      {
        // pretty: true,
        doctype: "html",
      },
      {}
    ),
    Linker({
      watch: "../vite-plugin-pug/src",
      exec: "cd ../vite-plugin-pug && npm run build",
      dist: "../vite-plugin-pug/dist",
      target: "./node_modules/vite-plugin-pug/dist",
    }),
  ],
})
