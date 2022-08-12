import {Product, ProductImage} from './classes.js'

export const products = [new Product( 1000, "Anillo de Oro con Piedra Verde", 2500, 3, (new ProductImage("assets/anillo-oro-piedra-verde-malu-malu.webp", "anillo de oro con piedra verde", 180, 180))), 
                  new Product( 2500, "Anillo de Oro y Plata", 1800, 1, (new ProductImage("assets/anillo-oro-plata-malu-malu.webp", "anillo de oro y plata", 180, 180))),
                  new Product( 3111, "Cadenita de Oro con Anillos", 2000, 10,(new ProductImage("assets/collar-anillos-malu-malu.webp", "cadenita de oro con anillos", 180, 180))),
                  new Product( 4444, "Pulsera de Oro", 930, 15,(new ProductImage("assets/pulsera-oro-malu-malu.webp", "pulsera de oro", 180, 180))),
                  new Product( 200, "Aros con Piedras Negros", 1800, 20,(new ProductImage("assets/aros-negros-malu-malu.webp", "aros negros piedras", 180, 180))),
                  new Product( 150, "Aros de Oro Rosa", 5000, 1,(new ProductImage("assets/aros-oro-rosa-diamantes-malu-malu.webp", "aros rosa", 180, 180)))]

export let cartList = []

console.log("vars.js loaded")