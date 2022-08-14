import {products} from './vars.js'
import {loadProducts, loadUserProfile,loadMinMaxProductsPrice} from './functions.js'
import {addEventsListenersToPurchaseButtons, addEventsListenerToSearchButton, addEventsListenerToRangeBar, addEventsListenersToAddToCartButtons, addEventListenerToEmptyCartButton,
    addEventListenerToImgProducts} from './events.js'

loadProducts(products)
addEventsListenersToPurchaseButtons()
addEventsListenerToSearchButton()
addEventsListenerToRangeBar()
addEventsListenersToAddToCartButtons()
addEventListenerToEmptyCartButton()
loadUserProfile()
addEventListenerToImgProducts()
loadMinMaxProductsPrice()

console.log("main-index.js loaded")