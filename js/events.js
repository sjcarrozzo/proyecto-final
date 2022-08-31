import {purchaseProduct, searchProductsByName, searchProductById, 
    searchProductsUntilPrice, validateLoginUserAndPass, addProductToCart, 
    createUser, loadUser, loadSearchResultProductsInContainer, emptyCart, showToastErrorNotificationWithMessage, showModalWindowWithImg, purchaseCart} from './functions.js'

export function addEventsListenersToPurchaseButtons(){
    let buttons = document.getElementsByClassName("purchase-button")

    for (const button of buttons) {
        button.addEventListener("click", purchaseProduct)
    }
}

export function addEventsListenerToSearchButton(){
    let searchButton = document.getElementById("search-button")
    searchButton.addEventListener("click", ()=>{
        let radioButtons = document.getElementsByClassName("radio-input")
        let nameOrId = document.getElementById("productNameOrId")
        let searchProductBy
        let products

        for (const btn of radioButtons) {
            if( btn.checked ){
                searchProductBy = btn.value
            }       
        }

        if( nameOrId.value != ""){

            switch(searchProductBy){
                case "name":
                    products = searchProductsByName( nameOrId.value )
                break
                case "id":
                    products = searchProductById( nameOrId.value )
                break
                default:
            }
        
            loadSearchResultProductsInContainer(products)
        
        }else{
            showToastErrorNotificationWithMessage("Debe ingresar un nombre o id de producto!", "top", "right")
        }
    })
}

export function addEventsListenerToRangeBar(){

    let rangeBar = document.getElementById("productPrice")
    rangeBar.addEventListener("change",(event)=>{
        let price = event.target.value
        let priceField = document.getElementById("price-field")
        let products

        priceField.innerText="$"+price
        products = searchProductsUntilPrice(price)
        
        loadSearchResultProductsInContainer(products)  
    })
}

export function addEventsListenersToAddToCartButtons(){
    
    let addToCartButtons = document.getElementsByClassName("add-to-cart-button")

    for (const btn of addToCartButtons) {
        btn.addEventListener("click", addProductToCart)
    }
}

export function addEventListenerToEmptyCartButton(){
    
    let emptyCartButton = document.getElementById("empty-cart-button")
    emptyCartButton.addEventListener("click", emptyCart)
}

export function addEventListenerToPurchaseCartButton(){
    
    let purchaseCartButton = document.getElementById("purchase-cart-button")
    purchaseCartButton.addEventListener("click", purchaseCart)
}

export function addEventListenerToLoginButton(){

    let loginButton = document.getElementById("login-user-button")
    loginButton.addEventListener("click", () =>{
        let userNameElement = document.getElementById("user-name")
        let userPassElement = document.getElementById("user-pass")

        if(validateLoginUserAndPass(userNameElement.value, userPassElement.value)){
            loadUser(userNameElement.value)
        }
        userNameElement.value=""
        userPassElement.value=""
    })
}

export function addEventListenerToCreateUserButton(){

    let createUserButton = document.getElementById("create-user-button")
    createUserButton.addEventListener("click", createUser)
}

export function addEventListenerToImgProducts(){
    let productsImgs = document.getElementsByClassName("product-img")

    for (const img of productsImgs){
        img.addEventListener("click", showModalWindowWithImg)
    }
}