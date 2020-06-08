const message = 'ConstanteSans'

const style = `
  background: #ff4552;
  font-size: 10px;
  padding: 10px;
  text-transform: uppercase;
  font-family: sans-serif;
  font-weight: bold;
`

export default {
  /**
   * Print the name of this project in the console.
   *
   * @returns {void} Nothing
   */
  print: () => console.info(`%c${message}`, style)
}
