import { $ } from '../helpers/DOMSelectors'
import experienceFactory from './experiences/experienceFactory'

export default class OverallModal {
  constructor (experiences) {
    this.name = 'overall'
    this.isClosed = true
    this.$overallModal = $('.c-overallModal')
    this.$toggle = $('.c-overallModal__header')
    this.$toggle.addEventListener('click', () => this.toggle())
  }

  bind (experiences) {
    const bindExperience = experience => {
      this[experience] = experienceFactory.create(experience)
      this[experience].$experience = $(`.c-experience--${experience}`, this.$overallModal)
    }
    this.experiences = experiences
    experiences.forEach(bindExperience)
  }

  toggle () {
    const action = this.isClosed ? 'start' : 'stop'
    this.isClosed = !this.isClosed
    this.$overallModal.classList.toggle('c-overallModal--expanded')
    this.experiences.forEach(experience => this[experience][action]())
  }
}
