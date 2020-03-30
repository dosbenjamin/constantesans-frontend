import noise from '../components/experiences/noise'
import light from '../components/experiences/light'

export default {
  /**
   * Bind/unbind experience to the modal based on its state.
   * @param  {string} experience - Name of the experience.
   * @param  {boolean} state - If modal is opened or close.
   * @return {void} Nothing
   */
  toggle (experience, state) {
    switch (experience) {
      case 'sound':
        state ? noise.stopListening() : noise.listen()
        break
      case 'light':
        state ? light.stopWatching() : light.watch()
        break
    }
  }
}
