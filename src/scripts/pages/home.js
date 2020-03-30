import customLog from '../components/custom-log'
import Modal from '../components/Modal'

const buttons = document.querySelectorAll('.menu__button')

export default {
  /**
   * Initialize the page.
   * @return {void} Nothing
   */
  init () {
    customLog.print()
    for (const button of buttons) {
      const { experience } = button.dataset
      const modal = new Modal(experience)
      button.addEventListener('click', () => { modal.isClosed && modal.open() })
    }
  }
}
