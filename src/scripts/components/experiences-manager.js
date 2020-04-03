import noise from '../components/experiences/noise'
import light from '../components/experiences/light'

export default {
  /**
   * Bind/unbind experience to the modal based on its state.
   * @param  {String} experience - Name of the experience.
   * @param  {Boolean} state - If modal is opened or close.
   * @param  {HTMLElement} $element - If modal is opened or close.
   * @return {Void} - Nothing
  */
  toggle (experience, state, $element) {
    switch (experience) {
      case 'sound':
        noise.$element = !state && $element
        state ? noise.stopListening() : noise.listen()
        break
      case 'light':
        light.$element = !state && $element
        state ? light.stopWatching() : light.watch()
        break
      default:
        break
    }
  }
}
