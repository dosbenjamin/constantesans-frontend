import {
  HumidityExperience,
  LightExperience,
  MovementExperience,
  TemperatureExperience,
  VibrationExperience,
  SoundExperience
} from './products/*'

const experiences = {
  humidity: () => new HumidityExperience(),
  light: () => new LightExperience(),
  movement: () => new MovementExperience(),
  temperature: () => new TemperatureExperience(),
  vibration: () => new VibrationExperience(),
  sound: () => new SoundExperience()
}

export default {
  /**
   * Create new experience.
   *
   * @param {string} name - The name of the experience to create
   * @returns {object} The experience
   */
  create: name => experiences[name]()
}
