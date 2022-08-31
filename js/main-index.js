import {loadProductsFromFile, loadUserProfile} from './functions.js'
import {addEventsListenerToSearchButton, addEventsListenerToRangeBar, addEventListenerToEmptyCartButton,
    addEventListenerToPurchaseCartButton} from './events.js'

loadProductsFromFile()
addEventsListenerToSearchButton()
addEventsListenerToRangeBar()
addEventListenerToEmptyCartButton()
addEventListenerToPurchaseCartButton()
loadUserProfile()

