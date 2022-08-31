import {cartList, products} from './vars.js'
import {Product, ProductImage, User} from './classes.js'
import {addEventsListenersToPurchaseButtons, addEventsListenersToAddToCartButtons, addEventListenerToImgProducts} from './events.js'

export function loadProductsFromFile(){

    fetch("./js/products.json")
        .then((response) => response.json())
        .then((data) => {
            data.forEach( jsonProduct => {
                products.push( new Product( jsonProduct.code, jsonProduct.description, jsonProduct.price, jsonProduct.stock, new ProductImage(jsonProduct.image.src, jsonProduct.image.alt, jsonProduct.image.width, jsonProduct.image.heigth)))
            })
            
            loadProductsInDOM()
            loadMinMaxProductsPrice()
            addEventsListenersToPurchaseButtons()
            addEventsListenersToAddToCartButtons()
            addEventListenerToImgProducts()
        })         
}

function loadProductsInDOM(){
    let productsContainer = document.getElementById("productos")

    products.forEach( product =>{
        if(product.inStock()){
             productsContainer.append(createHtmlProductNodeWithProduct(product))
         }
     })
}
export function purchaseProduct(event){
    let purchasedProductId = event.target.parentNode.id
    let product = searchProductById(purchasedProductId)

    if(product.inStock()){
        showToastNotificationWithMessage("Compraste producto: " + product.name, "top", "right")
        product.updateStock() 
        updateStockOfProductNode(product.stock, event.target.parentNode )
        
    } else{
        showToastErrorNotificationWithMessage("¡El producto seleccionado no tiene stock!","top","right")
    }
}

function updateStockOfProductNode( stock, node){
    node.children[3].innerText = "Stock: " + stock
}

export function addProductToCart(event){
    
    let addedToCartProductId = event.target.parentNode.id
    let product = searchProductById(addedToCartProductId)
    let cart = document.getElementById("products-cart")
    let totalPriceNode=document.getElementById("total-price")
    

    product.addedToCart()

    if( !product.inStock() ){
        showToastErrorNotificationWithMessage("¡El producto seleccionado no tiene stock!","top","right")
    } else if( !product.canBeAddedToCart() ){
        showToastErrorNotificationWithMessage("¡Las unidades en el carrito no pueden superar el stock del producto!","top","right")
    } else {
        cartList.push(product)
        cart.append(createHtmlProductNodeWithProductForCart(product))
        let totalPriceSpan = document.createElement("span")
        document.getElementById("purchase-cart-button").className="active"
        document.getElementById("empty-cart-button").className="active"

        totalPriceSpan.innerText=`Total: $${getTotalPriceOfCart()}`
        totalPriceSpan.classList.add("w-100","d-block","total-price")
        totalPriceNode.innerHTML=""
        totalPriceNode.append(totalPriceSpan) 
        showToastNotificationWithMessage("Agregaste al carrito: " + product.name ,"top","right")
    }
}

export function getTotalPriceOfCart(){
    let sum = 0
    cartList.forEach( product =>{ sum += product.price })
   
    return sum
}

function createHtmlProductNodeWithProductForCart(product){
    let productNode = document.createElement("div")

    productNode.className="product-cart"
    productNode.id="product-${product.id}"
    productNode.setAttribute("style","border-bottom: 1px solid gold;")
    productNode.innerHTML=`
        <img src="${product.getImgSrc()}" alt="${product.getImgAlt()}" width="30" heigth="30">    
        <span>1 - ${product.name} - $${product.price}</span>`
            
    return productNode
}  

export function validateLoginUserAndPass(userName, userPass){

    let user = getUserWithNameAndPass(userName,userPass)
    
    if( user ) {
        return true
    }else{ 
        showToastErrorNotificationWithMessage("Usuario inexistente o contraseña inválida", "top", "right")
        return false
    }
}

function getUserWithNameAndPass(userName, userPass){

    let userJson = JSON.parse( localStorage.getItem(userName) )
    let user

    if( userJson && userJson.userPass == userPass ){
        user = new User( userJson.userName, userJson.userPass )
        sessionStorage.setItem("logged-user", user.userName)
    }
    
    return user
}

export function searchProductById(productId){
    if( productId.toString() )
    return products.find(product=> product.id == productId)
}

export function searchProductsByName(productName){

    let productNameLowerCase = productName.toLowerCase()
    return products.filter(product=> product.name.toLowerCase().includes(productNameLowerCase))
}

export function searchProductsUntilPrice(price){

    return products.filter(product => product.inStock() && product.price <= price)
}

function createHtmlProductNodeWithProduct(product){
    let productNode = document.createElement("div")

    productNode.className="product"
    productNode.id=product.id
    productNode.innerHTML=`
        <span class="product-name">${product.name}</span>
        <span class="product-code">Cod.Producto: ${product.id}</span>
        <span class="product-price">$${product.price}</span>
        <span>Stock: ${product.stock}</span>
        <img class="product-img" src="${product.getImgSrc()}" alt="${product.getImgAlt()}" width="${product.getImgWidth()}" heigth="${product.getImgHeigth()}">
        <button class="add-to-cart-button">Agregar al carrito</button>
        <button class="purchase-button">Comprar Ahora</button>`

    return productNode
}

export function createUser(){
    let userNameElement = document.getElementById("create-user-name")
    let userPassElement = document.getElementById("create-user-pass")

    if( validateCreateUserAndPass(userNameElement.value, userPassElement.value) ){

        let user = new User(userNameElement.value, userPassElement.value)
        let userStringify = JSON.stringify(user)
        localStorage.setItem(userNameElement.value,userStringify)

        showToastNotificationWithMessage("¡Usuario creado con éxito!", "top", "right")

        userNameElement.value = ""
        userPassElement.value = ""
    }
}

function validateCreateUserAndPass(userName, userPass){

    if( !( userName && userPass)){
        showToastErrorNotificationWithMessage("ERROR: usuario o password se encuentra vacío", "top", "right")
        return false
    }

    if( !( userName.length >= 6 && userPass.length >= 6 )){
        showToastErrorNotificationWithMessage("ERROR: usuario o password no tiene tamaño mínimo de 6 caracteres", "top", "right")
        return false
    }

    return true
}

export function loadUser(){

    showToastNotificationWithMessage("¡Conectado con éxito!", "top", "right")
    loadUserProfile()
    
}

export function loadSearchResultProductsInContainer(products){
   
    let productsDivContainer = document.createElement("div")
    productsDivContainer.className="product-container products-searched-container"
    productsDivContainer.id="searched-products"

    let searchResult = document.getElementById("search-result")
    let span = document.createElement("span")
        
    if(searchResult.hasChildNodes()){
        searchResult.innerHTML=""
    }
    
    span.className="section-title-search-result"
   
    if( products.length != 0 ){
        span.innerText = "Resultados de Búsqueda"
        
        if( products.length > 1){
            
            products.forEach( product =>{
                productsDivContainer.append(createHtmlProductNodeWithProduct(product))
            })
        }else{
            Array.isArray(products) ? productsDivContainer.append(createHtmlProductNodeWithProduct(products[0])) : productsDivContainer.append(createHtmlProductNodeWithProduct(products))
        }

    }else{
        span.innerText = "No se encontraron productos"
    }

    searchResult.append(span)
    searchResult.append(productsDivContainer)
}

function showToastNotificationWithMessage(message, gravity, position){

    Toastify({
        text: message,
        duration: 2500,
        close: true,
        gravity: gravity,
        position: position,
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to right, #1d976c, #a5cc82)",
        },
      }).showToast()
}

export function showToastErrorNotificationWithMessage(message, gravity, position){

    Toastify({
        text: message,
        duration: 2500,
        close: true,
        gravity: gravity,
        position: position,
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to right, #ed213a, #93291e)",
        },
      }).showToast()
}

function showConfirmationModalWindowWithMessage(title, text, confirmBtnText, confirmFunction, successText){

    Swal.fire({
        title: title,
        text: text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#52c234',
        cancelButtonColor: '#d33',
        confirmButtonText: confirmBtnText
      }).then((result) => {
        if (result.isConfirmed) {
            confirmFunction()
            Swal.fire({
                title: successText,
                icon: 'success',
                confirmButtonColor: '#52c234'
            })
        }
      })
}

export function emptyCart(){

    if(cartList.length != 0 ){
        let title = "¿Desea eliminar su carrito?"
        let confirmBtnText = "Sí, eliminar"
        let successText = "Carrito eliminado!"

        showConfirmationModalWindowWithMessage(title, "", confirmBtnText, actionsToEmptyCart, successText)
    }else{
        showToastNotificationWithMessage("No hay productos a eliminar!", "top", "right")
    }
}

function actionsToEmptyCart(){
    let productsCart = document.getElementById("products-cart")
    let totalPriceNode=document.getElementById("total-price")
    productsCart.innerHTML=""
      
    for (let index = 0; index < cartList.length; index++){
        cartList.pop().resetUnitsInCart()
    }        
    
    document.getElementById("purchase-cart-button").className="deactivate"
    document.getElementById("empty-cart-button").className="deactivate"

    totalPriceNode.innerHTML=`<span class="total-price">Total: $0</span>`
}

export function purchaseCart(){

    if(cartList.length != 0 ){
        let totalPrice = document.getElementById("total-price").innerText
        let title = `
            ¿Desea comprar los productos de su carrito?
            ${totalPrice}
        `
        let confirmBtnText = "Sí, comprar"
        let successText = "Gracias por su compra!"
        
        showConfirmationModalWindowWithMessage(title, "", confirmBtnText, actionsToPurchaseCart, successText)
    }else{
        showToastNotificationWithMessage("No hay productos para comprar!", "top", "right")
    }
}

function actionsToPurchaseCart(){
    let productsCart = document.getElementById("products-cart")
    let totalPriceNode=document.getElementById("total-price")

    while( cartList.length > 0 ){
        let product = cartList.pop()
        let productNode = document.getElementById(product.id)
        product.discountUnitsInCart()
        product.resetUnitsInCart()
        updateStockOfProductNode(product.stock, productNode)    
    }        
    
    productsCart.innerHTML=""

    document.getElementById("purchase-cart-button").className="deactivate"
    document.getElementById("empty-cart-button").className="deactivate"

    totalPriceNode.innerHTML=`<span class="total-price">Total: $0</span>`
}

export function loadUserProfile(){
    let userLoggedName = sessionStorage.getItem("logged-user")

    if(userLoggedName){
        let userContainer = document.getElementById("logged-user-name")
        let button = document.createElement("button")
        
        button.innerText = `Salir de Cuenta`
        button.id = "logout-button"

        userContainer.innerHTML=`
            <span class="user-ico"></span>    
            <span class="user-name">${userLoggedName}</span>
            <button id="logout-button">Salir de Cuenta</button>
        `
        userContainer.className="active"
        
        addEventListenerToLogOutButton()
    }
}

function addEventListenerToLogOutButton(){
    let button = document.getElementById("logout-button")
    
    button.addEventListener("click", logOutUser)
}

function logOutUser(){

    showConfirmationModalWindowWithMessage("¿Desea desconectarse de su cuenta?","", "Sí, desconectarme", actionsToLogOutUser,"Desconectado")
}

function actionsToLogOutUser(){
    let userContainer = document.getElementById("logged-user-name")
    userContainer.className="deactivate"

    sessionStorage.removeItem("logged-user")
}

export function showModalWindowWithImg(event){

    Swal.fire({
        imageUrl: `${event.target.src}`,
        imageHeight: 500,
        imageAlt: `${event.target.alt}`,
        confirmButtonColor: '#52c234'
      })
}

export function loadMinMaxProductsPrice(){
    let span = document.getElementById("min-max-price")
    let pricesArray = products.map( product => product.price)
    let input = document.getElementById("productPrice")

    let min = Math.min(... pricesArray)
    let max = Math.max(... pricesArray)

    span.innerText = `Min: $${min-100} - Max: $${max+100}`
    input.min = `${min-100}`
    input.max = `${max+100}`
}