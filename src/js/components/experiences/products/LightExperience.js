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
      $parent: this.isIsolated ? this.$experience.parentElement : this.$experience.parentElement.parentElement,
      style: {
        /**
         * Remove the dark appareance when the light is on.
         *
         * @returns {void} Nothing
         */
        on: () => {
          this.$experience.classList.remove('c-experience--dark')
          variations.$parent.style['background-color'] = '#fff'
          variations.$parent.style.color = '#1b1d1c'
        },

        /**
         * Add the dark appareance when the light is off.
         *
         * @returns {void} Nothing
         */
        off: () => {
          this.$experience.classList.add('c-experience--dark')
          variations.$parent.style['background-color'] = '#1b1d1c'
          variations.$parent.style.color = '#fff'
        }
      }
    }
    const updateValues = () => {
      this.$values[0].textContent = variations.content[state]
      this.$values[1].textContent = variations.weight[state]
    }
    this.isIsolated && updateValues()
    variations.style[state]()
  }
}
