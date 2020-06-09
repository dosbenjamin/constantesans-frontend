import { $ } from '../helpers/DOMSelectors'

// TODO: Adapter le taille des textes pendant le resize.

/**
 * Class representing a modal.
 */
export default class Modal {
  /**
   * Initialize and manage a modal.
   *
   * @param {string} name - The name of the modal
   */
  constructor (name) {
    this.name = name
    this.isClosed = true
    this.$modal = $(`[data-modal-${this.name}]`)
    this.$header = $('.c-modal__header', this.$modal)
    this.$resize = $('.c-modal__resize', this.$modal)
    this.$close = $('.c-modal__close', this.$modal)
    this.$close.addEventListener('click', () => this.close())
    this.move()
    this.resize()
  }

  /**
   * Open a modal.
   *
   * @returns {void} Nothing
   */
  open () {
    const $currentFront = $('.is-selected') ? $('.is-selected') : this.$modal
    $currentFront.classList.remove('is-selected')
    this.isClosed = false
    this.$modal.classList.add('is-visible', 'is-selected')
    this.experience && this.experience.toggle(this.isClosed)
    this.sizes = (({ width, height }) => ({ width, height }))(this.$modal.getBoundingClientRect())
  }

  /**
   * Close a modal.
   *
   * @returns {void} Nothing
   */
  close () {
    this.isClosed = true
    this.$modal.classList.remove('is-visible', 'is-selected')
    this.experience && this.experience.toggle(this.isClosed)
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
      event.preventDefault()
      if (event.target.classList.contains('c-modal__close')) return
      const $currentFront = $('.is-selected') ? $('.is-selected') : this.$modal
      isSelected = true
      $currentFront.classList.remove('is-selected')
      this.$modal.classList.add('is-selected')
      offset.x = event.offsetX
      offset.y = event.offsetY
      this.$modal.parentElement.append(this.$modal)
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

    /**
     * Event when the resize button is clicked.
     *
     * @param {object} event - The event
     * @returns {void} Nothing
     */
    const attach = event => {
      isResizing = true
      coords.x = event.clientX
      coords.y = event.clientY
    }

    /**
     * Event while resizing the modal.
     *
     * @param {object} event - The event
     * @returns {void} Nothing
     */
    const drag = event => {
      const newSizes = (({ width, height }) => ({ width, height }))(this.$modal.getBoundingClientRect())
      const newCoords = (({ x, y }) => ({ x, y }))(event)
      let fontSize

      if (newSizes.height >= newSizes.width) {
        fontSize = (newSizes.height / window.innerHeight) * 6.5 + 'vh'
      } else if (newSizes.width < newSizes.height) {
        fontSize = (newSizes.height / window.innerHeight) * 3 + 'vh'
      } else if (newSizes.width > newSizes.height) {
        fontSize = (newSizes.width / window.innerWidth) * 10 + 'vh'
      }

      if (coords.x < newCoords.x) {
        this.$modal.style.width = `${newSizes.width + (newCoords.x - coords.x)}px`
      } else if (coords.x > newCoords.x && newSizes.width - (coords.x - newCoords.x) > window.innerWidth / 5) {
        this.$modal.style.width = `${newSizes.width - (coords.x - newCoords.x)}px`
      }

      if (coords.y > newCoords.y) {
        this.$modal.style['min-height'] = `${newSizes.height - (coords.y - newCoords.y)}px`
      } else if (coords.y < newCoords.y) {
        this.$modal.style['min-height'] = `${newSizes.height + (newCoords.y - coords.y)}px`
      }

      this.$experience.style['font-size'] = fontSize

      coords.x = event.clientX
      coords.y = event.clientY
    }

    /**
     * Event when the click is released on the resize button.
     *
     * @returns {void} Nothing
     */
    const unattach = () => { isResizing = false }

    this.$resize.addEventListener('mousedown', attach)
    window.addEventListener('mousemove', event => isResizing === true && drag(event))
    window.addEventListener('mouseup', unattach)
  }
}
