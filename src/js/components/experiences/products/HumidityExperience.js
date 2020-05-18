import Experience from '../Experience'

/**
 * Class representing a humidity experience.
 */
export default class HumidityExperience extends Experience {
  constructor () { super('humidity') }

  /**
   * Start the experience when the modal is opened.
   *
   * @returns {void} Nothing
   */
  start () {
    Experience.sensors.emit('check_humidity')
    Experience.sensors.on('humidity_update', value => this.setVariation(value))
  }

  /**
   * Stop the experience when the modal is closed.
   *
   * @returns {void} Nothing
   */
  stop () { Experience.sensors.off('humidity_update') }

  /**
   * Apply typography style and insert values inside modal on humidity changes.
   *
   * @param {number} value - The humidity value in percentage.
   * @returns {void} Nothing
   */
  setVariation (value) {
    this.$values[0].textContent = `${value}%`
    this.$values[1].textContent = value * 300 / 100
    this.$experience.style['font-variation-settings'] = `"wght" ${value * 300 / 100}`
  }
}
