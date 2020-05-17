import { $ } from '../helpers/DOMSelectors'
import customLog from '../components/customLog'
import Modal from '../components/Modal'
import experienceFactory from '../components/experiences/experienceFactory'
import experiencesData from '../../data/experiences.json'

const experiences = Object.keys(experiencesData)

/**
 * Build and link a modal to its experience button.
 *
 * @param {string} experience  - none
 * @returns {void} Nothing
 */
const buildModal = experience => {
  const modal = new Modal(experience)
  modal.experience = experienceFactory.create(experience)
  $(`[data-button-${experience}]`).addEventListener('click', () => { modal.isClosed && modal.open() })
}

export default {
  /**
   * Initialize the page.
   *
   * @returns {void} Nothing
   */
  init: () => { customLog.print(); experiences.forEach(buildModal) }
}
