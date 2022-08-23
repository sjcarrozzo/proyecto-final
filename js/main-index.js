import {loadProductsFromFile, loadUserProfile} from './functions.js'
import {addEventsListenerToSearchButton, addEventsListenerToRangeBar, addEventListenerToEmptyCartButton} from './events.js'

loadProductsFromFile()
addEventsListenerToSearchButton()
addEventsListenerToRangeBar()
addEventListenerToEmptyCartButton()
loadUserProfile()

