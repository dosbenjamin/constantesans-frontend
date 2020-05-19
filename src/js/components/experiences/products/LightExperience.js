import Experience from '../Experience'

/**
 * Class representing a light experience.
 */
export default class LightExperience extends Experience {
  constructor () { super('light') }

  /**
   * Start the experience when the modal is opened.
   *
   * @returns {void} Nothing
   */
  start () {
    Experience.sensors.emit('check_light')
    Experience.sensors.on('light_update', state => this.setVariation(state))
  }

  /**
   * Stop the experience when the modal is closed.
   *
   * @returns {void} Nothing
   */
  stop () {
    this.$values[0].textContent = ''
    this.$values[1].textContent = ''
    Experience.sensors.off('light_update')
  }

  /**
   * Apply typography style and insert values inside modal on light changes.
   *
   * @param {string} state - The state of the light (on/off)
   * @returns {void} Nothing
   */
  setVariation (state) {
    const variations = {
      content: { on: 'allumée', off: 'éteinte' },
      weight: { on: 200, off: 900 },
      style: {
        /**
         * Remove the dark appareance when the light is on.
         *
         * @returns {void} Nothing
         */
        on: () => this.$experience.classList.remove('c-experience--dark'),

        /**
         * Add the dark appareance when the light is off.
         *
         * @returns {void} Nothing
         */
        off: () => this.$experience.classList.add('c-experience--dark')
      }
    }
    this.$values[0].textContent = variations.content[state]
    this.$values[1].textContent = variations.weight[state]
    variations.style[state]()
  }
}
