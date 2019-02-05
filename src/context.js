import React, { Component } from 'react'
import { storeProducts , detailProduct } from './data'

const ProductContext = React.createContext();

//Provider
//Consumer

class ProductProvider extends Component {

    state ={
        products: [],
        detailProduct: detailProduct,
        cart: [],
        cartSubTotal: 0,
        cartTax: 0,
        cartTotal: 0,
    }
    componentDidMount() {
        this.setProducts();
    }
//Copying the whole array into tempProducts
    setProducts = () => {
        let tempProducts = [];
        storeProducts.forEach(item => {
            const singleItem = {...item};
            //grabbing  the old values from the tempProducts and attaching them with singleItem
            tempProducts = [...tempProducts, singleItem];
        })

        this.setState(() => {
            return {products: tempProducts}
        })
    }

    getItem = id => {
        const product = this.state.products.find(item => item.id === id)
        return product
    }

    handleDetail = id => {
        const product = this.getItem(id)
        this.setState(() => {
            return {detailProduct: product}
        })    
    }

    addToCart = id => {
        let tempProducts = [...this.state.products]
        const index = tempProducts.indexOf(this.getItem(id))
        const product = tempProducts[index]
        product.InCart = true
        product.count = 1
        product.total = product.price

        this.setState(() => {
            return {
                products: tempProducts,
                cart: [...this.state.cart , product]
            }
        },
        () => {
            this.addTotals()
        })
    }

    increment = id => {
        let tempCart = [...this.state.cart]
        const selectedProduct = tempCart.find(item => item.id === id)
        const selectedIndex = tempCart.indexOf(selectedProduct)
        const product = tempCart[selectedIndex];
        product.count += 1
        product.total = product.count * product.price
        this.setState({
            cart: [...tempCart]
        }, 
        () => {
            this.addTotals()
        })
    }
    decrement = id => {
        let tempCart = [...this.state.cart]
        const selectedProduct = tempCart.find(item => item.id === id)
        const selectedIndex = tempCart.indexOf(selectedProduct)
        const product = tempCart[selectedIndex];
        
        product.count = product.count - 1
        if(product.count === 0){ this.removeItem(id) }
        else{
            product.total = product.count * product.price
            this.setState({
                cart: [...tempCart]
            }, 
            () => {
                this.addTotals()
            })
        }
    }

    removeItem = id => {
        let tempProducts = [...this.state.products];
        let tempCart = [...this.state.cart];

        tempCart = tempCart.filter(item => item.id !== id);
        const index = tempProducts.indexOf(this.getItem(id));
        let removedProduct = tempProducts[index];
        removedProduct.InCart = false
        removedProduct.count = 0
        removedProduct.total = 0

        this.setState({
            cart: [...tempCart],
            products: [...tempProducts]
        },
        () => {
            this.addTotals()
        })
    }

    clearCart = () => {
        this.setState({
            cart: []
        },
        () => {
            this.setProducts()
            this.addTotals()
        })
    }

    addTotals = () => {
        let subTotal = 0
        this.state.cart.map(item => subTotal += item.total)
        const tempTax = subTotal * 0.1
        const tax = parseFloat(tempTax.toFixed(2))
        const total = subTotal + tax

        this.setState({
            cartSubTotal: subTotal,
            cartTax: tax,
            cartTotal: total,
        })
    }

  render() {
    return (
      <ProductContext.Provider value= {{
        ...this.state, //destructuring
        handleDetail: this.handleDetail,
        addToCart: this.addToCart,
        increment: this.increment,
        decrement: this.decrement,
        removeItem: this.removeItem,
        clearCart: this.clearCart
      }}>
        {this.props.children}
      </ProductContext.Provider>
    )
  }
}


const ProductConsumer = ProductContext.Consumer;
export { ProductProvider, ProductConsumer }