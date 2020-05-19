import { $, $$ } from '../../helpers/DOMSelectors'
import { RPi } from '../../helpers/raspberry'
import { getRandomInt } from '../../helpers/random'

/**
 * Class representing an abstract experience.
 */
export default class Experience {
  static sensors = RPi

  /**
   * Initialize and manage an experience.
   *
   * @param {string} name - The name of the experience.
   */
  constructor (name) {
    this.name = name
    this.$experience = $(`.c-experience--${this.name}`)
    this.$sentences = $$('.c-experience__sentence', this.$experience)
    this.$values = $$(`[data-modal-${this.name}] .js-value`)
  }

  /**
   * Start or stop the experience depending on the modal state.
   *
   * @param {boolean} isClosed - The state of the modal (opened/closed).
   * @returns {void} Nothing
   */
  toggle (isClosed) {
    this.isClosed = isClosed
    this.displaySentence()
    isClosed ? this.stop() : this.start()
  }

  /**
   * Start the experience when the modal is opened.
   *
   * @returns {void} Nothing
   */
  start () {}

  /**
   * Stop the experience when the modal is closed.
   *
   * @returns {void} Nothing
   */
  stop () {}

  /**
   * Apply typography style and insert values inside modal on changes.
   *
   * @returns {void} Nothing
   */
  setVariation () {}

  /**
   * Choose randomly one sentence to display.
   *
   * @returns {void} Nothing
   */
  displaySentence () {
    const sentence = {
      index: Math.floor(getRandomInt(0, this.$sentences.length - 1)),

      /**
       * Add the css class that display the sentence.
       *
       * @returns {void} Nothing
       */
      show: () => this.$sentence.classList.add('is-visible'),

      /**
       * Remove the css class that display the sentence.
       *
       * @returns {void} Nothing
       */
      hide: () => {
        this.$sentence.classList.remove('is-visible')
        this.$sentence = null
      }
    }
    this.$sentence = this.$sentence || this.$sentences[sentence.index]
    this.isClosed ? sentence.hide() : sentence.show()
  }
}
