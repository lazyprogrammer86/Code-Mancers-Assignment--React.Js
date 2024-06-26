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
    const initalNewProduct = {title: '', description: '', image: '', price: 0};
    const [newData, setNewData] = useState(initalNewProduct);

    let showNewData = () => {
      axios.get("http://localhost:3000/api/product/get", {headers: {Authorization: isState.token}}).then((res)=>{
        setData(res.data)
      }).catch(error => {
        alert(error.message);
      });
    }

    useEffect(()=>{
      showNewData();
    })
    
    const handleSubmit= async(e) => {
      e.preventDefault();
      try{
        await axios.post('http://localhost:3000/api/product/insert', newData, {headers: {authorization: isState.token}});
        setNewData(initalNewProduct);
        showNewData();
      }catch(error){
        alert(error.message);
      }
    }

    const handleChange = (key, value) => {
      setNewData(prev => ({...prev, [key]: value}));
    };
        return (
            <>
             <h1>Welcome to Product Store</h1>
            
            <div className={Style.grid}>
              
              {data.map((el)=>(
             <CartProduct key={el.productId} productId={el.productId} title={el.title} image={el.image} 
             price={el.price} description={el.description} showNewData= {showNewData}/>
              ))}
            {isState.isAdmin === true ? <form className={Style.newProd}  onSubmit={handleSubmit}>
              <h2>Add New Product</h2>
              <input type ='text' className={Style.prodInput} placeholder="Enter the Title"  onChange={(e) => handleChange('title', e.target.value)}  value={newData.title}/>
              <input type ='text' className={Style.prodInput} placeholder="Enter the description" onChange={(e) => handleChange('description', e.target.value)} value={newData.description}/>
              <input type ='number' className={Style.prodInput} placeholder="Enter the price" onChange={(e) => handleChange('price', Number(e.target.value))} value={newData.price}/>
              <input type ='text' className={Style.prodInput} placeholder="Paste Image URL" onChange={(e) => handleChange('image', e.target.value)} value={newData.image}/>
              <div className={Style.submit} >
              <input  type="Submit"/>
              </div>
            </form> : ''
            }
    
    
          </div>
          <Footer/>
            </>
           
        )
   





}





