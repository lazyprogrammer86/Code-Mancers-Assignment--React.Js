import React from "react"
import { useState } from "react"
import style from "./Login.module.css"
import { useContext } from "react"
import { AuthContext } from "../Context/AuthContext"
import { useNavigate } from "react-router-dom"
import Footer from "./Footer"
import axios from "axios"

const userLogin=(userData)=>{
   return axios.post("http://localhost:3000/auth/login", userData);
}

export const Login=()=>{
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("")
    const {loginUser,logoutUser,isState,}= useContext(AuthContext)
     
    const navigate= useNavigate();
        const userData={
            email:email, 
            password:password
        }

    const handleLogin=(e)=>{
        e.preventDefault()
        
        userLogin(userData)
        .then((res)=> {
            loginUser(res.data.token);
            console.log(res.data);
            navigate("/product")
        }).catch(error => {
            alert(error.message);
        });
    }

    return (
        <div>
          
            <form onSubmit={handleLogin} className={style.form} >
            <h2>Login</h2>
               <input placeholder="Enter eve.holt@reqres.in" type="email"   onChange={(e) => setEmail(e.target.value)} />
               <input  placeholder="Enter cityslicka" type="password"  onChange={(e) => setPassword(e.target.value)} />
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