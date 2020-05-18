import { $ } from '../helpers/DOMSelectors'

// TODO: Garder la position en z-index de chaque fenêtre.
// TODO: z-index le plus haut lors de l'affiche.
// TODO: Adapter le taille des textes pendant le resize.

/**
 * Class representing a modal.
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
    this.$header = $('.c-modal__header', this.$modal)
    this.$resize = $('.c-modal__resize', this.$modal)
    this.$close = $('.c-modal__close', this.$modal)
    this.move()
    this.resize()
    this.close()
  }

  /**
   * Open a modal.
   *
   * @returns {void} Nothing
   */
  open () {
    this.isClosed = false
    this.$modal.classList.add('is-visible')
    this.experience && this.experience.toggle(this.isClosed)
    this.size = (({ width, height }) => ({ width, height }))(this.$modal.getBoundingClientRect())
  }

  /**
   * Close a modal.
   *
   * @returns {void} Nothing
   */
  close () {
    const close = () => {
      this.isClosed = true
      this.$modal.classList.remove('is-visible', 'is-selected')
      this.experience && this.experience.toggle(this.isClosed)
    }
    this.$close.addEventListener('click', close)
  }

  /**
   * Move a modal.
   *
   * @returns {void} Nothing
   */
  move () {
    const offset = { x: 0, y: 0 }
    let isSelected = false

    /**
     * Event when the modal header is clicked.
     *
     * @param {object} event - The event
     * @returns {void} Nothing
     */
    const attach = event => {
      if (event.target.classList.contains('c-modal__button')) return
      const currentFront = $('.is-selected') ? $('.is-selected') : this.$modal
      isSelected = true
      currentFront.classList.remove('is-selected')
      this.$modal.classList.add('is-selected')
      offset.x = event.offsetX
      offset.y = event.offsetY
    }

    /**
     * Event while dragging the modal.
     *
     * @param {object} event - The event
     * @returns {void} Nothing
     */
    const drag = event => {
      const coords = {
        x: event.clientX - offset.x,
        y: event.clientY - offset.y
      }
      if (isSelected) {
        event.preventDefault()
        this.$modal.style.left = coords.x + 'px'
        this.$modal.style.top = coords.y + 'px'
      }
    }

    /**
     * Event when the click is released on the modal header.
     *
     * @returns {void} Nothing
     */
    const unattach = () => { isSelected = false }

    this.$header.addEventListener('mousedown', attach)
    window.addEventListener('mousemove', drag)
    window.addEventListener('mouseup', unattach)
  }

  resize () {
    const coords = { x: 0, y: 0 }
    let isResizing = false

    const attach = event => {
      isResizing = true
      coords.x = event.clientX
      coords.y = event.clientY
    }

    const drag = event => {
      const newSize = (({ width, height }) => ({ width, height }))(this.$modal.getBoundingClientRect())
      const newCoords = (({ x, y }) => ({ x, y }))(event)

      if (coords.x < newCoords.x) {
        this.$modal.style.width = `${newSize.width + (newCoords.x - coords.x)}px`
      } else if (coords.x > newCoords.x && newSize.width - (coords.x - newCoords.x) > this.size.width) {
        this.$modal.style.width = `${newSize.width - (coords.x - newCoords.x)}px`
      }

      if (coords.y > newCoords.y && newSize.height - (coords.y - newCoords.y) > this.size.height) {
        this.$modal.style.height = `${newSize.height - (coords.y - newCoords.y)}px`
      } else if (coords.y < newCoords.y) {
        this.$modal.style.height = `${newSize.height + (newCoords.y - coords.y)}px`
      }

      coords.x = event.clientX
      coords.y = event.clientY
    }

    const unattach = () => { isResizing = false }

    this.$resize.addEventListener('mousedown', attach)
    window.addEventListener('mousemove', event => isResizing === true && drag(event))
    window.addEventListener('mouseup', unattach)
  }
}
