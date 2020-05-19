import Experience from '../Experience'

/**
 * Class representing a temperature experience.
 */
export default class TemperatureExperience extends Experience {
  constructor () { super('temperature') }

  /**
   * Start the experience when the modal is opened.
   *
   * @returns {void} Nothing
   */
  start () {
    Experience.sensors.on('check_temperature', value => this.setVariation(value))
    Experience.sensors.on('temperature_update', value => this.setVariation(value))
  }

  /**
   * Stop the experience when the modal is closed.
   *
   * @returns {void} Nothing
   */
  stop () { Experience.sensors.off('temperature_update') }

  /**
   * Apply typography style and insert values inside modal on temperature changes.
   *
   * @param {number} value - The temperature value in celsius
   * @returns {void} Nothing
   */
  setVariation (value) {
    this.$values[0].textContent = `${value}°`
    value = value * 2.5 * 10
    this.$experience.style['font-variation-settings'] = `"wght" ${value}, "CONT" ${1000 - value}`
    this.$values[1].textContent = value
    this.$values[2].textContent = 1000 - value
  }
}
