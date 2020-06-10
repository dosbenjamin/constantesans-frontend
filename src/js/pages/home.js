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
  const $button = $(`[data-button-${experience}]`)
  const action = {
    open: () => modal.open(),
    close: () => modal.close() && $button.classList.remove('is-active')
  }
  modal.experience = experienceFactory.create(experience)
  modal.$experience = $('.c-experience', modal.$modal)
  modal.experience.isolate()
  $button.addEventListener('click', () => { modal.isClosed ? action.open() : action.close() })
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
    $('.c-popup__close').addEventListener('click', e => { $('.c-popup').classList.remove('is-visible') })
    moveVariations.init()
    customLog.print()
  }
}
