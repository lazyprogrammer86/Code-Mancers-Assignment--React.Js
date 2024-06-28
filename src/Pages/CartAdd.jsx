import axios from "axios"
import { useContext } from "react"
import { AuthContext } from "../Context/AuthContext"
import sTyle from "./CartAdd.module.css"
import { useNavigate } from "react-router-dom"

const CartProduct=(props)=>{
    const {image, title, description, price, productId, showNewData, added}=props
    const {showCartData, cartData, isState}= useContext(AuthContext)
    const navigate = useNavigate();
 

 const addtoCart=(productId)=>{
    let data = cartData.map(item => ({productId: item.productId, count: item.count}));
    
    let index = data.findIndex(item => item.productId === productId);
    if(index === -1) data.push({productId: productId, count: 1});
    else data[index].count++;
    axios.put("http://localhost:3000/api/cart/insert", data, {headers:{Authorization: isState.token}})
    .then((res)=>{
        showCartData()
        alert("Successfully added to cart")
    })
    .catch((err)=>{
        alert("Product already added to cart")
    })

   }
   
    const deleteProduct = async(id) => {
        try{
            await axios.delete('http://localhost:3000/api/product/delete?productId='+id, {headers: {Authorization: isState.token}});
            showNewData();
        }catch(error){
            alert(error.message);
        }
    }

    const updateProduct = async(id) => {
        try{
            navigate(`/edit/${id}`);
        }catch(error){
            alert(error.message);
        }
    }
    return (
        <div  className={sTyle.btn}>
            <img src={image} alt="thumbnail"/>
            <h3>{title}</h3>
            <p>{description}</p>
            <p className={sTyle.price} >price $: {price}</p>
            {added ? <button style={{background: 'orange', cursor: 'no-drop'}}>IN CART</button> : <button onClick={() => addtoCart(productId)} style={{background: 'green'}}>ADD TO CART</button>}
            <br />
            <br />
            {isState.isAdmin === true ? <>
                <button style={{backgroundColor: 'orange', width:'120px', marginRight: '10px'}} onClick={() => updateProduct(productId)}>EDIT</button>
                <button style={{width:'120px', marginLeft: '10px'}} onClick={() => deleteProduct(productId)}> DELETE </button >
            </>: ''}
        </div>
    )

}

export default CartProduct;

 