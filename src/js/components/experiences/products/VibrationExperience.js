import Experience from '../Experience'

/**
 * Class representing a vibration experience.
 */
export default class VibrationExperience extends Experience {
  constructor () {
    super('vibration')
    this.default = setInterval(() => {
      this.$values[0].textContent = 'Aucunes'
      this.$values[1].textContent = '500'
      this.$experience.style['font-variation-settings'] = `"wght" ${500}`
    }, 200)
  }

  /**
   * Start the experience when the modal is opened.
   *
   * @returns {void} Nothing
   */
  start () { Experience.sensors.on('vibration_update', () => this.setVariation()) }

  /**
   * Stop the experience when the modal is closed.
   *
   * @returns {void} Nothing
   */
  stop () { Experience.sensors.off('vibration_update') }

  /**
   * Apply typography style and insert values inside modal on vibrations.
   *
   * @returns {void} Nothing
   */
  setVariation () {
    clearInterval(this.variation)
    this.$values[0].textContent = 'Détectées'
    this.$values[1].textContent = '650'
    this.$experience.style['font-variation-settings'] = `"wght" ${650}`
  }
}
