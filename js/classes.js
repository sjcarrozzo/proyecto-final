export class Product{

    constructor(id, name, price, stock, img){
        this.id = Number(id)
        this.name = name
        this.price = Number(price)
        this.stock = Number(stock)
        this.img = img
        this.unitsAddedInCart = 0
    }

    inStock(){
        return this.stock > 0
    }

    canBeAddedToCart(){
        return this.unitsAddedInCart <= this.stock
    }

    addedToCart(){
        this.unitsAddedInCart++
    }

    resetUnitsInCart(){
        this.unitsAddedInCart = 0
    }

    updateStock(){
        this.stock--

        if( !this.inStock() ){
            console.log("Se agotó el stock del producto: " + this.name )
            let productElement = document.getElementById(this.id)
            productElement.className = productElement.className + " out-of-stock"
        }
    }

    showPriceInNumberOfPayments(number){

        let dividedPrice = this.price / number

        console.log( number + " cuotas de $" + dividedPrice )
    }

    getImgSrc(){
        return this.img.src
    }
    
    getImgAlt(){
        return this.img.alt
    }

    getImgWidth(){
        return this.img.width
    }

    getImgHeigth(){
        return this.img.heigth
    }
}

export class ProductImage{

    constructor(src, alt, width, heigth){
        this.src = src
        this.alt = alt 
        this.width = width
        this.heigth = heigth
    }
}

export class User{

    constructor( userName, userPass){
        this.userName = userName
        this.userPass = userPass
    }
}

console.log("classes.js loaded")