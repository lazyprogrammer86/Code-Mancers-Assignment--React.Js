import  React, { useEffect } from "react";
import { useContext } from "react"
import { AuthContext } from "../Context/AuthContext"
import Style from "./Cart.module.css"


export const Cart =()=>{
    const {cartData, showCartData, handleDelete ,handleAddQty,handleDecrease, handleCheckout}= useContext(AuthContext);
    
    const total=cartData.reduce((acc,el)=>acc + el.price * el.count,0)
    useEffect(() => {
      showCartData();
    }, [])
   return(
    <div>
      {cartData.map((el)=>
    
        <div className={Style.cart} key={el.productId}>
        <img  height="50px"  width="100px" src={el.image} alt={el.image} className={Style.img}  />
         <h3>{el.title}</h3>
         <p className={Style.pricepara}>Price $:{el.price} </p>
         <div className={Style.threebtn} >
          <button onClick={()=>handleAddQty(el.productId)} >+</button>
          <button>{el.count}</button>
          <button disabled={el.count===1} onClick={()=>handleDecrease(el.productId)}>-</button>
         </div>
         
         <div>
         <button className={Style.remove} onClick={()=>handleDelete(el.productId)}>Remove</button>
         </div>
         
       </div>
    )}
    <div className={Style.total}>Total $ {total.toFixed(2)}</div>
      {cartData.length ? <div>
      <button className={Style.checkout} onClick={()=>handleCheckout()}>Checkout</button>
      </div> : ''}
    </div>

   )
}
   


