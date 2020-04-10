import sound from './experiences/noise'
import light from './experiences/light'

const experiences = { sound, light }
const getExperience = name => experiences[name]

export default {
  /**
   * Bind/unbind experience to the modal based on its state.
   *
   * @param {string} name - Name of the experience.sudo apt-get update
   * @param {boolean} isClosed - If modal is opened or close.
   * @param {object} $element - If modal is opened or close.
   * @returns {void} Nothing
   */
  toggle (name, isClosed, $element) {
    const experience = getExperience(name)
    experience.$element = isClosed ? null : $element
    isClosed ? experience.stop() : experience.start()
  }
}
