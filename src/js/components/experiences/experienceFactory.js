import {
  SoundExperience,
  LightExperience,
  TemperatureExperience,
  PressureExperience,
  TouchExperience,
  MovementExperience
} from './products/*'

const experiences = {
  sound: () => new SoundExperience(),
  light: () => new LightExperience(),
  temperature: () => new TemperatureExperience(),
  pressure: () => new PressureExperience(),
  touch: () => new TouchExperience(),
  movement: () => new MovementExperience()
}

export default {
  /**
   * Creates new experience.
   *
   * @param {string} name - The name of the experience to create.
   * @returns {object} The experience.
   */
  create: name => experiences[name]()
}
