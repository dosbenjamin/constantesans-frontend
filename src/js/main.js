'use strict'

import home from './pages/home'

const { namespace } = document.body.dataset
const pages = { home: () => home.init() }

/**
 * Loads the current page.
 *
 * @param {string} current - The name of the current page.
 * @returns {void} Nothing
 */
const getPage = current => pages[current]()

document.addEventListener('DOMContentLoaded', getPage(namespace))
