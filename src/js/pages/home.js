import { $$ } from '../utils/selectors'
import customLog from '../components/customLog'
import Modal from '../components/Modal'

const $$buttons = $$('.menu .bigText')

export default {
  /**
   * Initialize the page.
   *
   * @returns {void} Nothing
   */
  init () {
    customLog.print()

    for (const $button of $$buttons) {
      const { button: experience } = $button.dataset
      const modal = new Modal(experience)
      $button.addEventListener('click', () => { modal.isClosed && modal.open() })
    }
  }
}
