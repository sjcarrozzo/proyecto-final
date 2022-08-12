import {cartList} from './vars.js'
import {purchaseProduct, searchProductsByName, searchProductById, 
    searchProductsUntilPrice, validateLoginUserAndPass, getTotalPriceOfCart, addProductToCart, 
    createUser, loadUser, loadSearchResultProductsInContainer} from './functions.js'


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
        let radioButton = document.getElementsByClassName("radio-input")
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
            alert("Debe ingresar un nombre o id de producto!")
        }
    })
}

export function addEventsListenerToRangeBar(){

    let rangeBar = document.getElementById("productPrice")
    rangeBar.addEventListener("change",(event)=>{
        let price = event.target.value
        let priceField = document.getElementById("price-field")
        let products
        let result = "Productos con precio hasta $" + price + ":" + "\n\n"

        priceField.innerText="$"+price
        products = searchProductsUntilPrice(price)
        products.forEach(product => {
            result = result + "(" + product.id + ")" +  product.name + " $" + product.price + "\n" + "------------------" + "\n"
        })

        alert(result)
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
    emptyCartButton.addEventListener("click",()=>{
        
        
      let productsCart = document.getElementById("products-cart")
      let totalPriceNode=document.getElementById("total-price")
      productsCart.innerHTML=""
      
        for (let index = 0; index < cartList.length; index++){
            cartList.pop().resetUnitsInCart()
        }        
                
        totalPriceNode.innerHTML=`<span>Total: $0</span>`
        alert("Se vació el carrito")
    })

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

console.log("events.js loaded")