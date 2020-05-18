import Experience from '../Experience'

/**
 * Class representing a movement experience.
 */
export default class MovementExperience extends Experience {
  constructor () {
    super('movement')
    this.default = setInterval(() => {
      this.$values[0].textContent = 'Aucuns'
    }, 1500)
  }

  /**
   * Start the experience when the modal is opened.
   *
   * @returns {void} Nothing
   */
  start () { Experience.sensors.on('movement_update', () => this.setVariation()) }

  /**
   * Stop the experience when the modal is closed.
   *
   * @returns {void} Nothing
   */
  stop () { Experience.sensors.off('movement_update') }

  /**
   * Apply typography style and insert values inside modal on movements.
   *
   * @returns {void} Nothing
   */
  setVariation () {
    clearInterval(this.variation)
    this.$values[0].textContent = 'Détectés'
    this.$experience.style['font-variation-settings'] = ''
  }
}
