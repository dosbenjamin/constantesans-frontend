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

export default { create: index => experiences[index]() }
