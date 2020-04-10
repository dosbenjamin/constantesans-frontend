'use strict'

import home from './pages/home'

const { namespace } = document.body.dataset
const pages = { home: () => home.init() }
const getPage = current => pages[current]()

document.addEventListener('DOMContentLoaded', getPage(namespace))
