import { $$ } from '../utils/selectors'
import customLog from '../components/custom-log'
import Modal from '../components/Modal'

const $$buttons = $$('.menu__button')

export default {
  /**
   * Initialize the page.
   * @return {Void} Nothing
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
