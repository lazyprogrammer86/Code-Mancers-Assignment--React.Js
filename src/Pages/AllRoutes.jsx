import { Routes, Route } from "react-router-dom";
import {Login} from "./Login.jsx"
import {Cart} from "./Cart.jsx"
import { Product } from "./Product.jsx";
import PrivateRoute from "./PrivateRoutes.jsx";
import { Register } from "./register.jsx";


export const AllRoutes=()=>{
    return (
        <div>
          <Routes>
          <Route path="/product" element={<PrivateRoute><Product/></PrivateRoute> } />
          <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>  } />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          </Routes>


        </div>
    )
}