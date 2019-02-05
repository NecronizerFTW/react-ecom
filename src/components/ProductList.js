import React, { Component } from 'react'
import Product from './Product'
import Title from './Title'
import {ProductConsumer} from '../context'
export default class ProductList extends Component {
  render() {
    return (
       <React.Fragment>
         <div className="py-5">
           <div className="container">
            <Title name="Our" title="Products" />
             <div className="row">
                <ProductConsumer>
                  {value => {
                    return value.products.map(data => {
                      return <Product
                        key = {data.id}
                        product = {data} 
                      />
                    })
                  }}
                </ProductConsumer>
             </div>
           </div>
         </div>
       </React.Fragment>
    )
  }
}
