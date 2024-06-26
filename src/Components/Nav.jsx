import React from "react"
import { NavLink } from "react-router-dom"
import Style from "./Nav.module.css"
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { FaShoppingCart } from "react-icons/fa";



export const Navbar = () => {
  const {cartData ,logoutUser, isState}= useContext(AuthContext)
 


  return (
    <div
       className={Style.nav}
    >
      <div  className={Style.myNext}>
        <div className={Style.logo}>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNAr63GytaAHrQB-1UYiyahhPPjgoPkt8n5Q&s" alt="logo"/>
        </div>
      { isState.isAuth ? <>
      <NavLink to="/product">Product</NavLink>

        <div className={Style.catdata}>
        <NavLink to="/cart">
            <FaShoppingCart className={Style.Shppgcart} />
         </NavLink>
         <div className={Style.busket}> {cartData.length}</div>
          </div>
          </>: ''
      }
      </div>
     
       {/* one more div */}
       <div className={Style.travel} >
       {isState.isAuth ? (<button onClick={logoutUser} >Logout</button>) :
         (<NavLink to="/login">Login</NavLink>)
           }
          {isState.isAuth ? '': (<NavLink to="/register">Register</NavLink>)}

        </div>
                   
    </div>
  );
};
