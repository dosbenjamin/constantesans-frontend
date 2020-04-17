import Experience from '../Experience'
import DecibelMeter from 'decibel-meter'

/**
 * Class representing a sound experience.
 */
export default class SoundExperience extends Experience {
  /**
   * Initializes and manages a sound experience.
   */
  constructor () {
    super('sound')
    this.sensor = new DecibelMeter()
    this.sensor.connectTo(0).catch(err => { console.log(err) })
    this.sensor.on('sample', (dB, percent, value) => this.setVariation(dB, percent, value))
    this.values = { dB: 0, percent: 0, raw: 0, weight: 0 }
  }

  /**
   * Starts the experience when the modal is opened.
   *
   * @returns {void} Nothing
   */
  start () { this.sensor.listen() }

  /**
   * Stops the experience when the modal is closed.
   *
   * @returns {void} Nothing
   */
  stop () { this.sensor.stopListening() }

  /**
   * Applies typography style and inserts values inside modal on sound changes.
   *
   * @param {number} dB - The sound power in decibel.
   * @param {number} percent - The sound power in percentage.
   * @param {number} value - The sound power in raw value.
   * @returns {void} Nothing
   */
  setVariation (dB, percent, value) {
    this.values = { dB, percent, raw: value, weight: value * 900 }
    this.$values[0].textContent = ` ${this.values.dB.toFixed(2)}`
    this.$values[1].textContent = ` ${this.values.weight.toFixed(2)}`
    this.$experience.style['font-variation-settings'] = `"wght" ${this.values.weight}`
  }
}
