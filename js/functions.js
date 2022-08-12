import {cartList, products} from './vars.js'
import {Product, ProductImage, User} from './classes.js'


export function loadProducts(products){
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
        alert("Compraste producto: " + product.name)
        product.updateStock() 
        updateStockOfProductNode(product.stock, event.target.parentNode )
        
    } else{
        alert("¡El producto seleccionado no tiene stock!")
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
        alert("¡El producto seleccionado no tiene stock!")
    } else if( !product.canBeAddedToCart() ){
        alert("¡Las unidades en el carrito no pueden superar el stock del producto!")
    } else {

        cartList.push(product)
        cart.append(createHtmlProductNodeWithProductForCart(product))
        let totalPriceSpan = document.createElement("span")
        totalPriceSpan.innerText=`Total: $${getTotalPriceOfCart()}`
        totalPriceNode.innerHTML=""
        totalPriceNode.append(totalPriceSpan) 
        alert("Agregaste al carrito " + product.name )
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
    productNode.innerHTML=`
        <img src="${product.getImgSrc()}" alt="${product.getImgAlt()}" width="30" heigth="30">    
        <span>1 - ${product.name} - $${product.price}</span>`
            
    return productNode
}  

export function validateLoginUserAndPass(userName, userPass){

    let user = getUserWithNameAndPass(userName,userPass)
    
    if( user ) {
        alert("¡Bienvenido nuevamente " + user.userName +"!") 
        return true
    }else{ 
        alert("Usuario inexistente o contraseña inválida")
        return false
    }
}

function getUserWithNameAndPass(userName, userPass){

    let userJson = JSON.parse( localStorage.getItem(userName) )
    let user

    if( userJson && userJson.userPass == userPass ){
        console.log("Se encontró usuario")
        user = new User( userJson.userName, userJson.userPass )
        sessionStorage.setItem("usuario", user.userName)
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
        <img src="${product.getImgSrc()}" alt="${product.getImgAlt()}" width="${product.getImgWidth()}" heigth="${product.getImgHeigth()}">
        <button class="add-to-cart-button">Agregar al carrito</button>
        <button class="purchase-button">Comprar</button>`
                    
    return productNode
}

export function createUser(){
    let userNameElement = document.getElementById("create-user-name")
    let userPassElement = document.getElementById("create-user-pass")

    if( validateCreateUserAndPass(userNameElement.value, userPassElement.value) ){

        let user = new User(userNameElement.value, userPassElement.value)
        let userStringify = JSON.stringify(user)
        localStorage.setItem(userNameElement.value,userStringify)

        alert("Usuario creado con éxito")

        userNameElement.value = ""
        userPassElement.value = ""
    }
}

function validateCreateUserAndPass(userName, userPass){

    if( !( userName && userPass)){
        alert("ERROR: usuario o password se encuentra vacío")
        return false
    }

    if( !( userName.length >= 6 && userPass.length >= 6 )){
        alert("ERROR: usuario o password no tiene tamaño mínimo de 6 caracteres")
        return false
    }

    return true
}

export function loadUser(userName){

    let userLogged = document.getElementById("logged-user")
    let userInfoP = document.createElement("p")
    userInfoP.innerText=`¡Bienvenido ${userName}!`
    userLogged.append(userInfoP)
    
}

export function loadSearchResultProductsInContainer(products){
   
    let productsDivContainer = document.createElement("div")
    productsDivContainer.className="product-container"
    productsDivContainer.id="searched-products"

    let searchResult = document.getElementById("search-result")
    let span = document.createElement("span")
        
    if(searchResult.hasChildNodes()){
        searchResult.innerHTML=""
    }
    
    span.className="section-title-search-result"
   
    if( products.length != 0 ){
        span.innerText = "Resultados de Búsqueda:"
        
        if( products.length > 1){
            
            products.forEach( product =>{
                productsDivContainer.append(createHtmlProductNodeWithProduct(product))
            })
        }else{
            
            if( Array.isArray(products)){
                productsDivContainer.append(createHtmlProductNodeWithProduct(products[0]))
            }else{
                productsDivContainer.append(createHtmlProductNodeWithProduct(products))
            }        
        }

    }else{
        span.innerText = "No se encontraron productos"
    }

    searchResult.append(span)
    searchResult.append(productsDivContainer)
}

console.log("functions.js loaded")