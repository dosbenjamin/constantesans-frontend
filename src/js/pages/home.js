import { $$ } from '../utils/selectors'
import customLog from '../components/customLog'
import Modal from '../components/Modal'
import experienceFactory from '../components/experiences/experienceFactory'

const $buttons = $$('.menu .bigText')

/**
 * Builds and links a modal to its experience button.
 *
 * @param {object} $button - Navigation button
 * @returns {void} Nothing
 */
const buildModal = $button => {
  const { button: experience } = $button.dataset
  const modal = new Modal(experience)
  modal.experience = experienceFactory.create(experience)
  $button.addEventListener('click', () => { modal.isClosed && modal.open() })
}

export default {
  /**
   * Initializes the page.
   *
   * @returns {void} Nothing
   */
  init: () => { customLog.print(); $buttons.forEach(buildModal) }
}
