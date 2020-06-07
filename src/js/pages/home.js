import experiencesData from '../../data/experiences.json'
import OverallModal from '../components/OverallModal'
import Modal from '../components/Modal'
import experienceFactory from '../components/experiences/experienceFactory'
import { $ } from '../helpers/DOMSelectors'
import moveVariations from '../components/moveVariations'
import customLog from '../components/customLog'

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
  modal.experience.isolate()
  $(`[data-button-${experience}]`).addEventListener('click', () => { modal.isClosed && modal.open() })
}

export default {
  /**
   * Initialize the page.
   *
   * @returns {void} Nothing
   */
  init: () => {
    const overallModal = new OverallModal()
    overallModal.bind(experiences)
    experiences.forEach(buildModal)
    moveVariations.init()
    customLog.print()
  }
}
