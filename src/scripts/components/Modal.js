import manager from './experiences-manager'

// TODO: Garder la position en z-index de chaque fenêtre.
// TODO: z-index le plus haut lors de l'affiche.
// TODO: Resize de la fenêtre.

/**
 * Class representing a modal that are used to display each experience.
 */
export default class Modal {
  /**
   * Manage a modal.
   * @param {string} name - The name of the experience.
   */
  constructor (name) {
    this.experience = name
    this.$modal = document.querySelector(`.modal[data-experience="${this.experience}"]`)
    this.$header = this.$modal.querySelector('.modal__header')
    this.$button = this.$modal.querySelector('.modal__button')
    this.selected = false
    this.isClosed = true
    this.events = {
      initMove: this.move(),
      initClose: this.close()
    }
  }

  /**
   * Open a modal.
   * @return {void} Nothing
   */
  open () {
    this.isClosed = false
    this.$modal.style.display = 'block'
    manager.toggle(this.experience, this.isClosed)
  }

  /**
   * Close a modal.
   * @return {void} Nothing
   */
  close () {
    this.$button.addEventListener('click', () => {
      this.isClosed = true
      this.$modal.style.display = 'none'
      manager.toggle(this.experience, this.isClosed)
    })
  }

  /**
   * Move a modal.
   * @return {void} Nothing
   */
  move () {
    const offset = { x: 0, y: 0 }
    this.$header.addEventListener('mousedown', e => {
      if (e.target.className === 'modal__button') return
      const currentFront = document.querySelector('.modal--front') ? document.querySelector('.modal--front') : this.$modal
      this.selected = true
      offset.x = e.offsetX
      offset.y = e.offsetY
      currentFront.classList.remove('modal--front')
      this.$modal.classList.add('modal--front')
    })
    window.addEventListener('mouseup', () => { this.selected = false })
    window.addEventListener('mousemove', e => {
      const coords = {
        x: e.clientX - offset.x,
        y: e.clientY - offset.y
      }
      this.selected && e.preventDefault()
      this.$modal.style.left = this.selected && coords.x + 'px'
      this.$modal.style.top = this.selected && coords.y + 'px'
    })
  }
}
