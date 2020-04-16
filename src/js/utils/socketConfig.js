import io from 'socket.io-client'

const middleware = io.connect('wss://rpi.benjamindossantos.be', { transports: ['polling'] })
export const rpi = io.connect('wss://clever-owl-36.telebit.io', { autoConnect: false, transports: ['websocket'] })

middleware.on('state_update', state => state && rpi.connect())
rpi.on('disconnect', () => rpi.disconnect())
