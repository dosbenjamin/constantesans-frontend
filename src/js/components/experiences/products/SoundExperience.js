import Experience from '../Experience'
import DecibelMeter from 'decibel-meter'

/**
 * Class representing a sound experience.
 */
export default class SoundExperience extends Experience {
  constructor () {
    super('sound')
    this.sensor = new DecibelMeter()
    navigator.userAgent.indexOf('Firefox') > 0 && this.sensor.sources.then(sources => {
      this.sensor.connect(sources[0])
    })
    this.sensor.on('sample', (dB, percent, value) => this.setVariation(dB, percent, value))
  }

  /**
   * Start the experience when the modal is opened.
   *
   * @returns {void} Nothing
   */
  start () { this.sensor.listen() }

  /**
   * Stop the experience when the modal is closed.
   *
   * @returns {void} Nothing
   */
  stop () { this.sensor.stopListening() }

  /**
   * Apply typography style and insert values inside modal on sound changes.
   *
   * @param {number} dB - The sound power in decibel
   * @param {number} percent - The sound power in percentage
   * @param {number} value - The sound power in raw value
   * @returns {void} Nothing
   */
  setVariation (dB, percent, value) {
    const weight = value * 900
    const updateValues = () => {
      this.$values[0].textContent = ` ${dB.toFixed(0)}dB`
      this.$values[1].textContent = ` ${weight.toFixed(0)}`
    }
    this.$experience.style['font-variation-settings'] = `"wght" ${weight}`
    this.isIsolated && updateValues()
  }
}
