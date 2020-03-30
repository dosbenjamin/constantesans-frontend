import DecibelMeter from 'decibel-meter'

const meter = new DecibelMeter('meter')

meter.connectTo('default')
meter.on('sample', (dB, percent, value) => {
  console.log(dB, percent, value)
})

export default meter
