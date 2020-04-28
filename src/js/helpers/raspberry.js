import io from 'socket.io-client'

const middleware = io.connect('wss://rpi.benjamindossantos.be', { transports: ['polling'] })
export const RPi = io.connect('wss://clever-owl-36.telebit.io', { autoConnect: false, transports: ['websocket'] })

middleware.on('state_update', state => state && RPi.connect())
RPi.on('disconnect', () => RPi.disconnect())
