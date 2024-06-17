import React from "react"
import { useState, useContext } from "react"
import style from "./Login.module.css"
import { useNavigate } from "react-router-dom"
import Footer from "./Footer"
import axios from "axios"
import {AuthContext} from '../Context/AuthContext';

const userRegister=(userData)=>{
   return axios.post("http://localhost:3000/auth/register", userData);
}

export const Register=()=>{
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const {isState}= useContext(AuthContext)
    const navigate= useNavigate();
    if(isState.isAuth) navigate("/product");
        const userData={
            username: username,
            email:email, 
            password:password
        }

    const handleRegister=(e)=>{
        e.preventDefault()
        
        userRegister(userData)
        .then(()=> {
            navigate("/login")
        }).catch(error => {
            alert(error.message);
        });
    }

    return (
        <div>
          
            <form onSubmit={handleRegister} className={style.form} style={{height: '350px'}} >
            <h2>Sign Up</h2>
               <input placeholder="Enter username" type="text"   onChange={(e) => setUsername(e.target.value)} />
               <input placeholder="Enter email Address" type="email"   onChange={(e) => setEmail(e.target.value)} />
               <input  placeholder="Enter Password" type="password"  onChange={(e) => setPassword(e.target.value)} />
               <div className={style.submit} >
               <input  type="Submit"/>
               </div>
              
            </form>
            <div className={style.footdiv}>
            <Footer/>
            </div>
        
        </div>
    )

}