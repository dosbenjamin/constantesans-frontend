import DecibelMeter from 'decibel-meter'

// TODO: Gérer erreur si pas de micro détecté.

const meter = new DecibelMeter('meter')

const experience = {
  $element: null,
  $values: document.querySelectorAll('[data-modal-sound] span'),
  dB: 0,
  percent: 0,
  value: 0,
  weight: 0,

  /**
   * Start the sound experience.
   *
   * @returns {void} - Nothing
   */
  bind () {
    experience.weight = experience.value * 900
    this.$element.style['font-variation-settings'] = `"wght" ${experience.weight}`
    this.$values[0].textContent = ` ${this.dB.toFixed(2)}`
    this.$values[1].textContent = ` ${this.weight.toFixed(2)}`
  },

  /**
   * Stop the sound experience.
   *
   * @returns {void} - Nothing
   */
  unbind () {}
}

meter.connectTo('default').catch(err => { console.log(err) })
meter.on('sample', (dB, percent, value) => {
  experience.dB = dB
  experience.percent = percent
  experience.value = value
  experience.bind()
})

export default {
  /**
   * Start to listen noise.
   *
   * @returns {void} - Nothing
   */
  start () {
    experience.$element = this.$element
    meter.listen()
  },

  /**
   * Stop listening noise.
   *
   * @returns {void} - Nothing
   */
  stop () {
    meter.stopListening()
    experience.unbind()
  },

  $element: null
}
