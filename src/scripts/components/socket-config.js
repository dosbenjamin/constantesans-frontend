import io from 'socket.io-client'

const url = 'https://clever-owl-36.telebit.io'
const socket = io.connect(url)

export default socket
