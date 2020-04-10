import { $, $$ } from '../utils/selectors'
import experience from './experiencesManager'

// TODO: Garder la position en z-index de chaque fenêtre.
// TODO: z-index le plus haut lors de l'affiche.
// TODO: Resize de la fenêtre.

/**
 * Class representing a modal that are used to display each experience.
 */
export default class Modal {
  /**
   * Manage a modal.
   *
   * @param {string} name - The name of the experience.
   */
  constructor (name) {
    this.experience = name
    this.selected = false
    this.isClosed = true
    this.$modal = $(`[data-modal-${this.experience}]`)
    this.$header = $('.modal__header', this.$modal)
    this.$button = $('.modal__button', this.$modal)
    this.$experience = $(`.experience--${this.experience}`)
    this.$$sentences = $$('.experience__sentence', this.$modal)
    this.$sentence = null
    this.events = {
      initMove: this.move(),
      initClose: this.close()
    }
  }

  /**
   * Open a modal.
   *
   * @returns {void} - Nothing
   */
  open () {
    this.isClosed = false
    this.randomSentence()
    this.$sentence.classList.add('experience__sentence--visible')
    this.$modal.classList.add('modal--visible')
    experience.toggle(this.experience, this.isClosed, this.$experience)
  }

  /**
   * Close a modal.
   *
   * @returns {void} - Nothing
   */
  close () {
    this.$button.addEventListener('click', () => {
      this.isClosed = true
      this.$modal.classList.remove('modal--visible', 'modal--front')
      this.$sentence.classList.remove('experience__sentence--visible')
      experience.toggle(this.experience, this.isClosed, this.$experience)
    })
  }

  /**
   * Move a modal.
   *
   * @returns {void} - Nothing
   */
  move () {
    const offset = { x: 0, y: 0 }

    this.$header.addEventListener('mousedown', e => {
      if (e.target.className === 'modal__button') return
      const currentFront = $('.modal--front') ? $('.modal--front') : this.$modal
      this.selected = true
      currentFront.classList.remove('modal--front')
      this.$modal.classList.add('modal--front')
      offset.x = e.offsetX
      offset.y = e.offsetY
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

  /**
   * Choose randomly one text to display.
   *
   * @returns {void} - Nothing
   */
  randomSentence () {
    const index = Math.floor(Math.random() * this.$$sentences.length)
    this.$sentence = this.$$sentences[index]
  }
}
