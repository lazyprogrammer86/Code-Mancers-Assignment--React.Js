import { Routes, Route } from "react-router-dom";
import {Login} from "./Login.jsx"
import {Cart} from "./Cart.jsx"
  import { Product } from "./Product.jsx";
import { AuthContext } from "../Context/AuthContext";
import { useContext } from "react";
import PrivateRoute from "./PrivateRoutes.jsx";


export const AllRoutes=()=>{
 const {cartData} =useContext(AuthContext)
    return (
        <div>
          <Routes>
          <Route path="/product" element={<PrivateRoute><Product/></PrivateRoute> } />
          <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>  } />
          <Route path="/login" element={<Login/>} />
          </Routes>


        </div>
    )
}