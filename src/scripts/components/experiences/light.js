import { $$ } from '../../utils/selectors'
import socket from '../socket-config'

const experience = {
  $element: null,
  $$values: $$('[data-modal-light] span'),
  state: '',
  content: '',

  /**
   * Start the light experience.
   * @return {Void} - Nothing
   */
  bind () {
    this.content = this.state === 'on' ? ' allumée' : ' éteinte'
    this.weight = this.state === 'on' ? ' 100' : ' 900'
    this.state === 'off'
      ? this.$element.classList.add('experience--dark')
      : this.$element.classList.remove('experience--dark')
    this.$$values[0].textContent = this.content
    this.$$values[1].textContent = this.weight
  },

  /**
   * Stop the light experience.
   * @return {Void} - Nothing
   */
  unbind () {
    this.$$values[0].textContent = ''
    this.$$values[1].textContent = ''
  }
}

export default {

  /**
   * Start to watch for light changes.
   * @return {Void} - Nothing
   */
  watch () {
    experience.$element = this.$element

    socket.emit('light_check', true)

    socket.on('light_state', state => {
      experience.state = state
      experience.bind()
    })
  },

  /**
   * Stop watching for light changes.
   * @return {Void} - Nothing
   */
  stopWatching () {
    socket.off('light_state')
    experience.unbind()
  },

  $element: null

}
