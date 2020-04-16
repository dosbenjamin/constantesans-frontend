import Experience from '../Experience'

/**
 * Class representing a light experience.
 */
export default class LightExperience extends Experience {
  constructor () {
    super('light')
    this.state = 'off'
    this.values = {
      content: { on: 'allumée', off: 'éteinte' },
      weight: { on: 100, off: 900 }
    }
  }

  start () {
    this.sensor.emit('light_check', true)
    this.sensor.on('light_update', this.setVariation)
  }

  stop () {
    this.$values[0].textContent = ''
    this.$values[1].textContent = ''
    this.sensor.off('light_update')
  }

  setVariation (state) {
    this.state = state
    this.$values[0].textContent = this.values.content[this.state]
    this.$values[1].textContent = this.values.weight[this.state]
  }
}
