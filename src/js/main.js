'use strict'

import home from './pages/home'

const { namespace } = document.body.dataset
const pages = { home: () => home.init() }

/**
 * Load the right page.
 *
 * @param {string} current - The name of the current page.
 * @returns {void} Nothing
 */
const getPage = current => pages[current]()

document.addEventListener('DOMContentLoaded', getPage(namespace))
