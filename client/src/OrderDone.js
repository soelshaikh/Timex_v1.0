import React from 'react'
import orderdone from './order.css'
import Header from './components/Header'
import {useParams,NavLink, useNavigate} from "react-router-dom"

const OrderDone = () => {
  return (
    <>
    <Header/>

        <div className="empty-cart-section section-fluid">
    <div className="emptycart-wrapper">
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-10 offset-md-1 col-xl-6 offset-xl-3">
                    <div className="emptycart-content text-center">
                        <div className="image">
                            <img className="img-fluid" src="assets/images/emprt-cart/png.png" alt=""/>
                        </div>
                        <h4 className="title">Your Orde is Placed Succesfully</h4>
                        <h6 className="sub-title">we notify via email</h6>
                      <NavLink to="/">

                        <a  className="btn btn-lg btn-golden">Back to HomePage</a>
                   
                        </NavLink> </div>
                </div>
            </div>
        </div>
    </div>
</div>
      </>

    
  )
}

export default OrderDone