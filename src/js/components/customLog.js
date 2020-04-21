const message = 'ConstanteSans'

const style = `
  background: #524bfb;
  font-size: 10px;
  padding: 10px;
  text-transform: uppercase;
  font-family: sans-serif;
  font-weight: bold;
`

export default {
  /**
   * Prints the name of this project in the console.
   *
   * @returns {void} Nothing
   */
  print: () => console.info(`%c${message}`, style)
}
