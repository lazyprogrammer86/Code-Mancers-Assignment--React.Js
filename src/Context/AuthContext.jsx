import axios from "axios"
import { Children, useEffect, useState } from "react"
import { createContext } from "react"
import { Navigate } from "react-router-dom"

export const AuthContext= createContext()

const AuthContextProvider=({children})=>{

    const [isState, setIsState] =useState({isAuth: localStorage.getItem('isAuth') || false, token: localStorage.getItem('token') || ''});

    
    const loginUser=(token) =>{
        setIsState({
            isAuth:true,
            token:token
        });
        localStorage.setItem('isAuth', true);
        localStorage.setItem('token', token);
        alert("Login Success")
       
    }

    const logoutUser=(email,token) =>{
       localStorage.removeItem('isAuth');
       localStorage.removeItem('token');
        setIsState(false)
    }

    const [cartData, setCart] = useState([])
   
    const [quantity, setQuantity]= useState(0)

    const showCartData=()=>{
        axios.get("http://localhost:3000/api/cart/get", {headers: {Authorization: isState.token}}).then((res)=>{
            setCart(res.data);
        });
    }
    useEffect(() => {
        showCartData()
    }, [quantity])

//prodct add
 const handleAddQty=async(id)=>{
    let data = cartData.map(item => ({productId: item.productId, count: item.count}));
    let index = data.findIndex(item => item.productId == id);

    if(index == -1) data.push({productId: id, count: 1});
    else data[index].count++;
    await axios.put(`http://localhost:3000/api/cart/insert`, data, {headers: {Authorization: isState.token}});
    showCartData();
}

 const handleDecrease= async(id) => {
    let data = cartData.map(item => ({productId: item.productId, count: item.count}));
    let index = data.findIndex(item => item.productId == id);
    if(index !== -1) {
        if(data[index].count > 1) data[index].count--;
        else data = data.filter(item => item.productId !=  id);
    }
    await axios.put(`http://localhost:3000/api/cart/insert`, data, {headers: { Authorization: isState.token}});
    showCartData();
}

const handleDelete = async (id) => {
    let data = cartData.map(item => ({productId: item.productId, count: item.count}));
    data = data.filter(item => item.productId !=  id);

    await axios.put(`http://localhost:3000/api/cart/insert`, data, {headers: { Authorization: isState.token}});
    showCartData();
}


    return(
        <AuthContext.Provider value={{cartData,handleAddQty,showCartData,handleDecrease, handleAddQty, 
           loginUser, isState,  logoutUser,handleDelete}} >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;