const promises = []
const modules = import.meta.glob("./src/(geometries|primitives|systems|components)/**/*.ts")

for (const path in modules) {
  promises.push(modules[path]())
}

Promise.all(promises).then(() => {
  const el = document.getElementById("scene-src")
  document.getElementById("scene").innerHTML = el.innerHTML
  el.parentNode.removeChild(el)
})
