import React, { useState, useEffect } from 'react';
import './Cart.css';
import CartItem from './CartItem'

function Cart() {
    const [products, setProducts] = useState({})

    const sumProductsPrice = () => {
        let sum = 0;
        Object.keys(products).forEach((ele) => {
            sum += products[ele].price * products[ele].quantity;
        })
        return sum;
    }

    useEffect(() => {
        const storedProducts = localStorage.getItem('carts') || JSON.stringify({})
        setProducts(JSON.parse(storedProducts))
    }, [])

    const handleDelete = (product) => {
        console.log(product)
        let alo = localStorage.getItem('carts');
        let storedProducts;
        if (alo) {
            storedProducts = JSON.parse(alo);
        } else {
            return
        }
        delete storedProducts[product]
        setProducts(storedProducts);
        localStorage.setItem('carts', JSON.stringify(storedProducts));
    }

    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <div>
            <div className="modal-body">
                <div className="cart-row">
                    <span className="cart-item cart-header cart-column">Product</span>
                    <span className="cart-price cart-header cart-column">Size</span>
                    <span className="cart-price cart-header cart-column">Price</span>
                    <span className="cart-quantity cart-header cart-column">Quantity</span>
                </div>
                <div className="cart-items">
                    {Object.keys(products).map((product, index) => (
                        <CartItem product={products[product]} handleDelete={() => { handleDelete(product) }}></CartItem>
                    ))}
                    <div className="cart-total">
                        <strong className="cart-total-title">Total:</strong>
                        <span className="cart-total-price">{`${numberWithCommas(sumProductsPrice())}円`}</span>
                    </div>
                </div>

            </div>
        </div>
    )
}


export default Cart;
