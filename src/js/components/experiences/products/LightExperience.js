import Experience from '../Experience'

/**
 * Class representing a light experience.
 */
export default class LightExperience extends Experience {
  /**
   * Initializes and manages a light experience.
   */
  constructor () {
    super('light')

    this.state = 'off'
    this.values = {
      content: { on: 'allumée', off: 'éteinte' },
      weight: { on: 100, off: 900 }
    }
  }

  /**
   * Starts the experience when the modal is opened.
   *
   * @returns {void} Nothing
   */
  start () {
    this.sensor.emit('light_check')
    this.sensor.on('light_update', this.setVariation)
  }

  /**
   * Starts the experience when the modal is opened.
   *
   * @returns {void} Nothing
   */
  stop () {
    this.$values[0].textContent = ''
    this.$values[1].textContent = ''
    this.sensor.off('light_update')
  }

  /**
   * Applies typography style and inserts values inside modal on light changes.
   *
   * @param {boolean} state - The state of the light (on/off).
   * @returns {void} Nothing
   */
  setVariation (state) {
    this.state = state
    this.$values[0].textContent = this.values.content[this.state]
    this.$values[1].textContent = this.values.weight[this.state]
  }
}
