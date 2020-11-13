import React from 'react'
import "./index.css"
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { gql } from '@apollo/client';
import { useEffect, useState } from 'react';
import NavBar from '../navbar';
import { useSelector } from 'react-redux'
import { formattedCurrency } from '../../utils';

//initialized Apollo client
const client = new ApolloClient({
    uri: 'https://pangaea-interviews.now.sh/api/graphql',
    cache: new InMemoryCache()
});

export default function Body() {

    //Get Currency from Redux Store
    const curr = useSelector(state => state.currency);


    //Retrieve products from graphql with unique currency
    const getProducts = (currency) =>
        client
            .query({
                query: gql`
    query GetProducts {
      products{
        id
        image_url
        title
        price(currency: ${currency})
      }
    }
  `
            })
            .then(({ data: { products } }) => {
                console.log(products)
                setProducts(products)
            });


    const [products, setProducts] = useState([])

    useEffect(() => {
        getProducts(curr)
    }, [curr])
    console.log('data', products)

    const [cartItems, setCartItems] = useState([])


    const changeShow = (item) => {
        increment(item)
        displayNav(true)
    }

    useEffect(() => {
        console.log('array', cartItems)
    }, [cartItems])


    //Check if cart item to be this ID
    const isInCart = (id) => {
        return cartItems.map(a => a.id).includes(id)
    }


    // Add count property to product
    const addCountToProduct = (product) => {
        return { ...product, count: cartItems.find(a => a.id === product.id).count }
    }


    //Increment individual cart item
    const increment = (id) => {
        if (!isInCart(id)) {
            setCartItems([...cartItems, { id, count: 1 }])
        }
        else {
            setCartItems(cartItems.map(a => a.id === id ? { ...a, count: a.count + 1 } : a))
        }
    }

    //Decrement individual Cart Item
    const decrement = (id) => {
        if (isInCart(id)) {
            const cartItem = cartItems.find(item => item.id === id)
            if (cartItem.count === 1) {
                removeItem(id)
            }
            else {
                setCartItems(cartItems.map(a => a.id === id ? { ...a, count: a.count - 1 } : a))
            }
        }

    }

    const [showNav, setShowNav] = useState(false)


    //Display sidebar
    const displayNav = (shouldShow) => {
        if (shouldShow) {
            document.body.style.overflow = "hidden";
        }
        else {
            document.body.style.overflow = "auto";
        }
        setShowNav(shouldShow)
    }

    //remove item from product

    const removeItem = (id) => {
        setCartItems(cartItems.filter(a => a.id !== id))
    }



    return (
        <>
            <NavBar remove={removeItem} showNav={showNav} displayNav={displayNav} increment={increment} decrement={decrement} number={cartItems.length} items={products.filter(product => isInCart(product.id)).map(product => addCountToProduct(product))} />
            <div className="container py-5">
                <div className="row">
                    <div className="col-md-6">
                        <h1 className="main-weight">All Products</h1>
                        <p className="weight-100">A 360° look at Lumin</p>
                    </div>
                </div>
            </div>
            <div className="grey-bg">
                <div className="container-fluid py-5">
                    <div className="row">
                        {products.map((item) => (
                            <div key={item.id} className="col-md-6 col-lg-4 col-sm-6 margin-bottom">
                                <div className="text-center">
                                    <img className="img-fluid img-height" src={item.image_url} />
                                </div>

                                <p className="text-center title">{item.title}</p>
                                <p className="text-center"><span>From</span> {formattedCurrency(item.price, curr)}</p>
                                <div className="text-center">
                                    <button onClick={() => changeShow(item.id)} className="button-primary ">Add to Cart</button>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>


        </>
    )
}
