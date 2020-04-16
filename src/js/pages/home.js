import { $$ } from '../utils/selectors'
import customLog from '../components/customLog'
import Modal from '../components/Modal'
import experienceFactory from '../components/experiences/experienceFactory'

const $buttons = $$('.menu .bigText')

export default {
  /**
   * Initialize the page.
   *
   * @returns {void} Nothing
   */
  init () {
    customLog.print()

    for (const $button of $buttons) {
      const { button: experience } = $button.dataset
      const modal = new Modal(experience)
      modal.experience = experienceFactory.create(experience)
      $button.addEventListener('click', () => { modal.isClosed && modal.open() })
    }
  }
}
