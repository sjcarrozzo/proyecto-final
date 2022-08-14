import {loadUserProfile} from './functions.js'
import {addEventListenerToLoginButton, addEventListenerToCreateUserButton} from './events.js'

addEventListenerToLoginButton()
addEventListenerToCreateUserButton()
loadUserProfile()

console.log("main-account.js loaded")
