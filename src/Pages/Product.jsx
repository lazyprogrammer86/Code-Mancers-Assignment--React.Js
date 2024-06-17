import React from "react"
import { useEffect, useState, useContext } from "react";
import Style from "./Product.module.css"
import CartProduct from "./CartAdd";
import axios from "axios";
import Footer from "./Footer";
import { AuthContext } from "../Context/AuthContext"



export const Product=()=>{
    const [data, setData] = useState([]);
    const {isState}= useContext(AuthContext)
    useEffect(()=>{
      axios.get("http://localhost:3000/api/product/get", {headers: {Authorization: isState.token}}).then((res)=>{
        setData(res.data)
      });
    },[])
    
        return (
            <>
             <h1>Welcome to Product Store</h1>
            
            <div className={Style.grid}>
              
              {data.map((el)=>(
             <CartProduct key={el.productId} productId={el.productId} title={el.title} image={el.image} 
             price={el.price} description={el.description} />
              ))}
    
    
          </div>
          <Footer/>
            </>
           
        )
   





}





