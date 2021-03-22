AFRAME.registerGeometry("four-square-geo", {
  schema: {
    width: {
      min: 0,
      default: 1,
      type: "number",
    },
    height: {
      min: 0,
      default: 1,
      type: "number",
    },
    depth: {
      min: 0,
      default: 0.1,
      type: "number",
    },
  },

  init(data) {
    const { width, height, depth } = data
    const geometry = THREE.BufferGeometryUtils.mergeBufferGeometries([
      new THREE.BoxBufferGeometry(width, depth, depth).translate(0, 0, (height / 2) - (depth / 2)),
      new THREE.BoxBufferGeometry(width, depth, depth).translate(0, 0, (-height / 2) + (depth / 2)),
      new THREE.BoxBufferGeometry(depth, depth, height).translate(-(width / 2) + depth / 2, 0, 0),
      new THREE.BoxBufferGeometry(depth, depth, height).translate(+(width / 2) - depth / 2, 0, 0),
      // new THREE.BoxBufferGeometry(depth, depth, height - depth).translate(-(width / 2) + (depth / 2), -height / 2, 0),
      // new THREE.BoxBufferGeometry(depth, depth, height - depth).translate(width / 2 - (depth / 2), -height / 2, 0),
      // new THREE.BoxBufferGeometry(width, depth, depth).translate(0, 0, 0),
      // new THREE.BoxBufferGeometry(width, depth, depth).translate(0, 0, -height),
      // new THREE.BoxBufferGeometry(depth, depth, height - depth).translate(-(width / 2) + (depth / 2), 0, -height / 2),
      // new THREE.BoxBufferGeometry(depth, depth, height - depth).translate(width / 2 - (depth / 2), 0, -height / 2),
    ])



    // @ts-ignore
    this.geometry = geometry
  },
})
