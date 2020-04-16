import Experience from '../Experience'
import DecibelMeter from 'decibel-meter'

/**
 * Class representing a sound experience.
 */
export default class SoundExperience extends Experience {
  constructor () {
    super('sound')
    this.sensor = new DecibelMeter()
    this.sensor.connectTo(0).catch(err => { console.log(err) })
    this.sensor.on('sample', (dB, percent, value) => this.setVariation(dB, percent, value))
    this.values = { dB: 0, percent: 0, raw: 0, weight: 0 }
  }

  start () { this.sensor.listen() }

  stop () { this.sensor.stopListening() }

  setVariation (dB, percent, value) {
    console.log('hello')
    this.values = { dB, percent, raw: value, weight: value * 900 }
    this.$values[0].textContent = ` ${this.values.dB.toFixed(2)}`
    this.$values[1].textContent = ` ${this.values.weight.toFixed(2)}`
    this.$experience.style['font-variation-settings'] = `"wght" ${this.values.weight}`
  }
}
