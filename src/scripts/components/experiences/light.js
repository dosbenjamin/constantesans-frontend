import socket from '../socket-config'

// TODO: Renommer le nom de l'event.
// TODO: Demander l'état de la lumière dés la connection.

export default {
  /**
   * Start to watch for light changes.
   * @return {void} Nothing
   */
  watch () {
    socket.on('lightmode', message => {
      console.log(message)
    })
  },

  /**
   * Stop watching for light changes.
   * @return {void} Nothing
   */
  stopWatching () {
    socket.off('lightmode')
  }
}
