import { getValueInRange } from '../helpers/range'

/**
 * The animation when the mouse/device is moving.
 *
 * @param {object} event - The event
 * @returns {void} Nothing
 */
const move = event => {
  const coords = (({ x, y }) => ({ x, y }))(event)
  const sizes = {
    height: getValueInRange(coords.y / window.innerHeight * 100, 100, 900),
    width: getValueInRange(coords.x / window.innerWidth * 100, 50, 100)
  }
  document.body.style['font-variation-settings'] = `'wght' ${sizes.height}, 'wdth' ${sizes.width}`
}

export default {
  /**
   * Start to animate typography when the mouse/device is moving.
   *
   * @returns {void} Nothing
   */
  init () {
    window.innerWidth > 1200 && window.addEventListener('mousemove', move)
    window.addEventListener('deviceorientation', e => {
      const sizes = {
        height: getValueInRange((e.alpha + 90) / 180 * 100, 100, 900),
        width: getValueInRange((e.beta + 90) / 180 * 100, 50, 100)
      }
      document.body.style['font-variation-settings'] = `'wght' ${sizes.height}, 'wdth' ${sizes.width}`
    })
  }
}
