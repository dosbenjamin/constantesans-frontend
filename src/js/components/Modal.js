import { $ } from '../utils/selectors'

// TODO: Garder la position en z-index de chaque fenêtre.
// TODO: z-index le plus haut lors de l'affiche.
// TODO: Resize de la fenêtre.

/**
 * Class representing a modal that are used to display each experience.
 */
export default class Modal {
  /**
   * Initialize and manage a modal.
   *
   * @param {string} name - The name of the modal.
   */
  constructor (name) {
    this.name = name
    this.isClosed = true
    this.$modal = $(`[data-modal-${this.name}]`)
    this.$header = $('.modal__header', this.$modal)
    this.$button = $('.modal__button', this.$modal)
    this.move()
    this.close()
  }

  /**
   * Open a modal.
   *
   * @returns {void} Nothing
   */
  open () {
    this.isClosed = false
    this.$modal.classList.add('modal--visible')
    this.experience && this.experience.toggle(this.isClosed)
  }

  /**
   * Close a modal.
   *
   * @returns {void} Nothing
   */
  close () {
    const close = () => {
      this.isClosed = true
      this.$modal.classList.remove('modal--visible', 'modal--front')
      this.experience && this.experience.toggle(this.isClosed)
    }
    this.$button.addEventListener('click', close)
  }

  /**
   * Move a modal.
   *
   * @returns {void} Nothing
   */
  move () {
    const offset = { x: 0, y: 0 }

    const attach = event => {
      if (event.target.className === 'modal__button') return
      const currentFront = $('.modal--front') ? $('.modal--front') : this.$modal
      this.isSelected = true
      currentFront.classList.remove('modal--front')
      this.$modal.classList.add('modal--front')
      offset.x = event.offsetX
      offset.y = event.offsetY
    }

    const drag = event => {
      const coords = {
        x: event.clientX - offset.x,
        y: event.clientY - offset.y
      }
      if (this.isSelected) {
        event.preventDefault()
        this.$modal.style.left = coords.x + 'px'
        this.$modal.style.top = coords.y + 'px'
      }
    }

    const unattach = () => { this.isSelected = false }

    this.$header.addEventListener('mousedown', attach)
    window.addEventListener('mousemove', drag)
    window.addEventListener('mouseup', unattach)
  }
}
