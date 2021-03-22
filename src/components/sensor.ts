AFRAME.registerComponent("sensor", {
  schema: {
    debug: {
      default: true,
    },
  },
  handleReading() {
    // @ts-ignore
    this.el.object3D.quaternion.fromArray(this.sensor.quaternion)
    if (this.data.debug) {
      this.el.getAttribute("rotation")
    }
  },
  init() {
    Promise.all([
      navigator.permissions.query({ name: "accelerometer" }),
      navigator.permissions.query({ name: "magnetometer" }),
      navigator.permissions.query({ name: "gyroscope" }),
    ]).then(results => {
      if (results.every(result => result.state === "granted")) {
        // @ts-ignore
        this.sensor = new AbsoluteOrientationSensor({ frequency: 60 })
        // @ts-ignore
        this.sensor.addEventListener("reading", this.handleReading.bind(this))
        // @ts-ignore
        this.sensor.start()
      }
    })
  },
})
