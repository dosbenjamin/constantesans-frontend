import { $, $$ } from '../../utils/selectors'
import { rpi } from '../../utils/socketConfig'

/**
 * Class representing an abstract experience.
 */
export default class {
  /**
   * Initializes and manages an experience.
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
   * Starts or stops the experience depending on the modal state.
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
   * Starts the experience when the modal is opened.
   *
   * @returns {void} Nothing
   */
  start () {}

  /**
   * Stops the experience when the modal is closed.
   *
   * @returns {void} Nothing
   */
  stop () {}

  /**
   * Applies typography style and inserts values inside modal on changes.
   *
   * @returns {void} Nothing
   */
  setVariation () {}

  /**
   * Chooses randomly one sentence to display.
   *
   * @returns {void} Nothing
   */
  displaySentence () {
    const sentence = {
      index: Math.floor(Math.random() * this.$sentences.length),

      /**
       * Adds the css class that display the sentence.
       *
       * @returns {void} Nothing
       */
      show: () => this.$sentence.classList.add('experience__sentence--visible'),

      /**
       * Removes the css class that display the sentence.
       *
       * @returns {void} Nothing
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
