import Experience from '../Experience'
import { getRandomInt } from '../../../helpers/random'

/**
 * Class representing a movement experience.
 */
export default class MovementExperience extends Experience {
  constructor () {
    super('movement')
    this.default = setInterval(() => {
      this.$values[0].textContent = 'aucuns'
      this.$values[1].textContent = '500'
      this.$values[2].textContent = '115'
      this.$experience.style['font-variation-settings'] = `'wght' ${500}, 'wdth' ${115}`
    }, 500)
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
    const variations = {
      weight: getRandomInt(200, 900),
      width: getRandomInt(100, 200)
    }
    clearInterval(this.variation)
    this.$values[0].textContent = 'détectés'
    this.$values[1].textContent = variations.weight.toFixed(0)
    this.$values[2].textContent = variations.width.toFixed(0)
    this.$experience.style['font-variation-settings'] = `'wght' ${variations.weight}, 'wdth' ${variations.width}`
  }
}
