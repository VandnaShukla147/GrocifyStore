import React, { useContext } from 'react'
import CartItem from './CartItem'
import { Link } from 'react-router-dom'
import { UserContext } from '../Store'

export default function Cart() {
  const store = useContext(UserContext)
  const isEmpty = store.cartList.length === 0;
  return (
    <div className='CartPage'>
      <h1 className='CartPageHeading'>Your Cart List</h1>
      <div className="CartWindow">
        <div className="CartList">
          {isEmpty ? (
            <div className="EmptyCartMsg">Your cart is empty</div>
          ) : (
            store.cartList.map((ele) => {
              // console.log(ele)
              return <CartItem key={ele.name} data={ele}></CartItem>
            })
          )}
        </div>

        <div className="CartDetails">
          <div className="CartDetail">
            <h1>Order Summary</h1>
            <div className="DetailItem">
              <span>Sub cost</span>
              <span className='ItemB'>{store.cartDetail.subcost}Rs</span>
            </div>
            <div className="DetailItem">
              <span>Discount</span>
              <span className='ItemB'>{store.cartDetail.discount}Rs</span>
            </div>
            <div className="DetailItem">
              <span>Tax</span>
              <span className='ItemB'>{store.cartDetail.tax}Rs</span>
            </div>
            <div className="DetailItem">
              <span>Shipping</span>
              <span className='ItemY'>free</span>
            </div>
            <div className="DetailItem">
              <span>Total Cost</span>
              <span className='ItemB'>{store.cartDetail.total}Rs</span>
            </div>
            <button className='CartBtn' disabled={isEmpty}> <Link to={isEmpty ? "#" : "/Payment"}>Proceed to Checkout</Link></button>
          </div>

        </div>
      </div>
    </div>
  )
}
