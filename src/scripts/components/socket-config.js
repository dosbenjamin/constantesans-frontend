import io from 'socket.io-client'

// TODO: Détecter si l'utilisateur à accès raspberry.

const url = 'https://clever-owl-36.telebit.io'

// window.fetch(url, {
//   mode: 'cors',
//   headers: {
//     'Content-Type': 'application/json',
//     'Access-Control-Allow-Origin': ''
//   }
// })
//   .then(response => response.json())
//   .then(data => {
//     console.log(data)
//   })

const socket = io.connect(url, {
  transports: ['websocket'],
  autoConnect: true
})

export default socket
