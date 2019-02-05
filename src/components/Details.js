import React, { Component } from 'react'
import {ProductConsumer} from '../context'
import {Link} from 'react-router-dom'
import {ButtonContainer} from './Button'

export default class Details extends Component {
  render() {
    return (
      <ProductConsumer>
        {value => {
          //Destructuring data
          const {id , title , img , price , info , company , inCart} = value.detailProduct       
          return (
            <div className="container py-5">
              {/* TITLE */}
              <div className="row">
                <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                  <h1>{title}</h1>
                </div>
              </div>
              {/* END TITLE */}
              {/*Product Info*/}
              <div className="row">
                <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                  <img src={img} alt='ProductPhoto' className='img-fluid' />
                </div>
                {/*Product text*/}
                <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                  <h1>model: {title}</h1>
                  <h4 className='text-title text-uppercase text-muted mt-3 mb-2'>Made By: 
                    <span className='text-uppercase'>{company}</span>
                  </h4>
                  <h4 className='text-blue'>
                    <strong>
                      price: <span>${price}</span>
                    </strong>
                  </h4>
                  <p className="text-capitalize font-weight-bold mt-3 mb-0">
                    some information
                    <p className="text-muted lead">
                      {info}
                    </p>
                  </p>
                  <Link to='/'>
                    <ButtonContainer>
                      Back To Products
                    </ButtonContainer>
                  </Link>
                  <ButtonContainer
                    disabled = {inCart ? true : false}
                    onClick = {() => value.addToCart(id)}
                  >
                    {inCart ? 'InCart' : 'Add To Cart'}
                  </ButtonContainer>
                </div>
              </div>
            </div>
          )   
        }}
      </ProductConsumer>
    )
  }
}
