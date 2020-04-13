import io from 'socket.io-client'

// TODO: Détecter si l'utilisateur à accès raspberry.

const rpi = {
  url: 'wss://clever-owl-36.telebit.io',
  isConnected: false,
  socket () {
    return io.connect(this.url, {
      autoConnect: false,
      transports: ['websocket']
    })
  },
  connect () {
    return this.socket().connect()
  },
  disconnect () {
    return this.socket().disconnect()
  }
}

const middleware = io.connect('wss://rpi.benjamindossantos.be', { transports: ['polling'] })
middleware.on('connected', state => {
  state ? rpi.connect() : rpi.disconnect()
  rpi.isConnected = state
})

// export default socket
