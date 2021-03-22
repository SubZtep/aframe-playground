// import { Component, Coordinate, Entity } from "aframe"
// import type * as dat from "dat.gui"

// import type { Coordinate } from "aframe"

// import type { Coordinate } from "aframe"

// import { Coordinate } from "aframe"

type UpdaterObj = { [key: string]: any }
type KeyVal = [string, string]

const isNumber = (value: string) => Number(value) === +value
const isBoolean = (value: string) => value === "true" || value === "false"
const isColor = (value: string) =>
  Object.keys(AFRAME.THREE.Color.NAMES).includes(value.toLowerCase()) ||
  /^\#([A-Fa-f\d]+)$/.test(value) ||
  /^((?:rgb|hsl)a?)\(([^\)]*)\)/.test(value)

const trimmer = (item: string) => item.trim()
const parseKeyVal = ([k, v]: KeyVal) => `${k}:${v}`
const parseAttrs = (obj: UpdaterObj) => Object.entries(obj).map(parseKeyVal).join(";")

const createController = (parent: dat.GUI, obj: UpdaterObj, key: string, val: string) => {
  let ctrl: dat.GUIController

  if (isNumber(val)) {
    obj[key] = Number(val)
    ctrl = parent
      .add(obj, key, obj[key])
      // .min(Number.MIN_SAFE_INTEGER)
      .min(-10)
      .step(
        +Number((val.split(".")[1] || "").length)
          .toFixed(2)
          .replace(/.$/, "1")
      )
  } else if (isBoolean(val)) {
    obj[key] = val === "true"
    ctrl = parent.add(obj, key, val)
  } else if (isColor(val)) {
    obj[key] = val
    ctrl = parent.addColor(obj, key)
  } else {
    obj[key] = val
    ctrl = parent.add(obj, key, val)
  }

  return ctrl
}

AFRAME.registerComponent("adat", {
  // schema: {
  //   enabled: {
  //     default: true,
  //     type: "boolean",
  //   },
  // },
  init() {
    const gui = new dat.GUI()

    // const attrsToSkip = [this.attrName, "rotation"]
    let attr: Attr

    for (attr of this.el.attributes) {
      if (attr.value && attr.value !== this.attrName) {
        const obj: UpdaterObj = {}

        if (attr.value.includes(":")) {
          const folder = gui.addFolder(attr.name)
          // folder.open()
          for (const param of attr.value.split(";")) {
            createController(folder, obj, ...(param.split(":").map(trimmer) as KeyVal)).onChange(() => {
              attr.value = parseAttrs(obj)
            })
          }
        } else {
          createController(gui, obj, attr.name, attr.value).onChange(value => {
            attr.value = value
          })
        }
      }
    }

    // const f = gui.addFolder("Rotation")
    // f.open()
    // // const rot: Coordinate = this.el.rotation
    // // const rot: Coordinate = this.el.getAttribute("rotation")
    // const rot = this.el.getAttribute("rotation")
    // // f.add(this.el.getAttribute("rotation"), "x", 0, 360).listen().onChange(value => this.el.setAttribute("rotation", { x: value }))
    // // f.add(this.el.getAttribute("rotation"), "x", 0, 360).listen().onChange(value => this.el.setAttribute("rotation", { x: value }))
    // f.add(this.el.getAttribute("rotation"), "x", -360, 360)
    //   .listen()
    //   .onChange(value => this.el.setAttribute("rotation", { x: value }))
    // f.add(this.el.getAttribute("rotation"), "y", -360, 360)
    //   .listen()
    //   .onChange(value => this.el.setAttribute("rotation", { x: value }))
    // f.add(this.el.getAttribute("rotation"), "z", -360, 360)
    //   .listen()
    //   .onChange(value => this.el.setAttribute("rotation", { x: value }))
    // // f.add(rot, "y", 0, 360)
    // // f.add(rot, "z", 0, 360)

    // // f.add(this.el.getAttribute(""), "x", 0, 1).listen()
    // // f.add(this.el.rotation, "y", 0, 1).listen()
    // // f.add(this.el.rotation, "z", 0, 1).listen()

    // // const quat = this.el.object3D.quaternion
    // // f.add(this.el.object3D.quaternion, "w", 0, 1).listen()
    // // f.add(this.el.object3D.quaternion, "x", 0, 1).listen()
    // // f.add(this.el.object3D.quaternion, "y", 0, 1).listen()
    // // f.add(this.el.object3D.quaternion, "z", 0, 1).listen()
    // // console.log(quat)
  },
})
