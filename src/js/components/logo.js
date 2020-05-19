import { $$ } from '../helpers/DOMSelectors'
import { getRandomInt } from '../helpers/random'

const $letters = $$('.c-logo__letter')

/**
 * Animate one letter of the logo.
 *
 * @param {object} $letter - A letter contained in the logo.
 * @returns {void} Nothing
 */
const animate = $letter => {
  $letter.style['font-variation-settings'] = `'wght' ${getRandomInt(100, 900)}, 'wdth' ${getRandomInt(50, 100)}`
  $letter.style['font-size'] = `${getRandomInt(2, 4)}vmin`
}

/**
 * Apply animation on each letters.
 *
 * @returns {void} Nothing
 */
const animation = () => $letters.forEach(animate)

export default {
  /**
   * Start to animate the logo every 2.5s.
   *
   * @returns {void} Nothing
   */
  init: () => setInterval(animation, 2500)
}
