import {products} from './vars.js'
import {loadProducts} from './functions.js'
import {addEventsListenersToPurchaseButtons, addEventsListenerToSearchButton, addEventsListenerToRangeBar, addEventsListenersToAddToCartButtons, addEventListenerToEmptyCartButton} from './events.js'

loadProducts(products)
addEventsListenersToPurchaseButtons()
addEventsListenerToSearchButton()
addEventsListenerToRangeBar()
addEventsListenersToAddToCartButtons()
addEventListenerToEmptyCartButton()

console.log("main-index.js loaded")