import home from './pages/home'

document.addEventListener('DOMContentLoaded', () => {
  'use strict'

  const { namespace } = document.body.dataset

  switch (namespace) {
    case 'home':
      home.init()
      break
  }
})
