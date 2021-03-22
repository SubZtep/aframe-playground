AFRAME.registerPrimitive(
  "four-square",
  AFRAME.utils.extendDeep({}, AFRAME.primitives.getMeshMixin(), {
    defaultComponents: {
      geometry: { primitive: "four-square-geo" },
      // material: {
      //   color: "#faa",
      //   shader: "flat",
      //   side: "double",
      //   transparent: true,
      // },
    },

    mappings: {
      depth: "geometry.depth",
      height: "geometry.height",
      width: "geometry.width",
    },
  })
)
