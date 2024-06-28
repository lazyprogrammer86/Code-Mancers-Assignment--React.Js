import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Style from './Product.module.css';
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";

export const EditProduct = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {isState, showCartData} = useContext(AuthContext);
    const initalEditProduct = {title: '', description: '', image: '', price: 0};
    const [data, setData] = useState(initalEditProduct);
    
    const handleChange = (key, value) => {
        setData(prev => ({...prev, [key]: value}));
    };
    
    const handleSubmit = async (e) => {
        try{
            e.preventDefault();
            await axios.put(`http://localhost:3000/api/product/update?productId=${id}`, data, {headers: {Authorization: isState.token}});
            showCartData();
            navigate('/');
        }catch(error){
            alert(error.message);
        }
    };
    
    useEffect(() => {
        axios.get(`http://localhost:3000/api/product/get?productId=${id}`, {headers: {Authorization: isState.token}})
        .then(res => {setData({title: res.data[0].title, description: res.data[0].description, price: res.data[0].price, image: res.data[0].image})})
        .catch(error => alert(error.message));
    }, [id]);

    return (
    <form className={Style.newProd}  onSubmit={handleSubmit}>
        <h2>Add New Product</h2>
        <input type ='text' className={Style.prodInput} placeholder="Enter the Title"  onChange={(e) => handleChange('title', e.target.value)}  value={data.title}/>
        <input type ='text' className={Style.prodInput} placeholder="Enter the description" onChange={(e) => handleChange('description', e.target.value)} value={data.description}/>
        <input type ='number' className={Style.prodInput} placeholder="Enter the price" onChange={(e) => handleChange('price', Number(e.target.value))} value={data.price}/>
        <input type ='text' className={Style.prodInput} placeholder="Paste Image URL" onChange={(e) => handleChange('image', e.target.value)} value={data.image}/>
        <div className={Style.submit} >
        <button className={Style.button} type="submit">Confirm</button>
        </div>
    </form>);
}