import { $, $$ } from '../../utils/selectors'
import { rpi } from '../../utils/socketConfig'

/**
 * Class representing an abstract experience.
 */
export default class {
  /**
   * Initialize and manage an experience.
   *
   * @param {string} name - The name of the experience.
   */
  constructor (name) {
    this.name = name
    this.sensor = rpi
    this.$experience = $(`.experience--${this.name}`)
    this.$sentences = $$('.experience__sentence', this.$experience)
    this.$values = $$(`[data-modal-${this.name}] span`)
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
   * Choose randomly one sentence to display.
   *
   * @returns {void} Nothing
   */
  displaySentence () {
    const sentence = {
      index: Math.floor(Math.random() * this.$sentences.length),

      /**
       * Add the css class that display the sentence.
       *
       * @returns {void}
       */
      show: () => this.$sentence.classList.add('experience__sentence--visible'),

      /**
       * Remove the css class that display the sentence.
       *
       * @returns {void}
       */
      hide: () => {
        this.$sentence.classList.remove('experience__sentence--visible')
        this.$sentence = null
      }
    }
    this.$sentence = this.$sentence || this.$sentences[sentence.index]
    this.isClosed ? sentence.hide() : sentence.show()
  }
}
