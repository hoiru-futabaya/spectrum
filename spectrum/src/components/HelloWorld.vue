<template>
  <div class="hello">
    {{view}}
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      view: null
    }
  },
  mounted: function () {
    const clickElem = document.createElement('div')
    clickElem.textContent = 'Click to Start'
    document.body.appendChild(clickElem)

    let req = null
    let getByteFrequencyDataAverage = null
    console.log(req)
    console.log(getByteFrequencyDataAverage)

    let clicked = false
    addEventListener('click', async () => {
      if (clicked) return
      clicked = true
      clickElem.remove()

      const audioCtx = new AudioContext()
      const stream = await navigator.mediaDevices.getUserMedia({audio: true})
      const input = audioCtx.createMediaStreamSource(stream)
      const analyzer = audioCtx.createAnalyser()
      // analyzer.fftSize = 256
      input.connect(analyzer)

      const canvas = document.createElement('canvas')
      canvas.width = innerWidth
      canvas.height = innerHeight
      document.body.appendChild(canvas)

      // const timeDomainArray = new Uint8Array(analyzer.fftSize)
      const frequencyArray = new Uint8Array(analyzer.frequencyBinCount)
      const render = () => {
        getByteFrequencyDataAverage = () => {
          analyzer.getByteFrequencyData(frequencyArray)
          return frequencyArray.reduce(function(previous, current) {
            return previous + current
          }) / analyzer.frequencyBinCount
        }
        let mathSolved = Math.floor(getByteFrequencyDataAverage() / 255 * 100) / 10
          if (mathSolved < 1) {
            this.view = mathSolved
          }
          else {
            this.view = 1
          }
        req = requestAnimationFrame(render)
      }
      req = requestAnimationFrame(render)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
