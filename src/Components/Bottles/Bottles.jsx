import { useEffect } from "react";
import { useState } from "react";
import Bottle from "../Bottle/Bottle";
import './bottles.css'
import { addToLS, removeFromLS } from "../Utilities/LocalStorage";
import { getStoredCart } from "../Utilities/LocalStorage";
import Cart from "../Cart/Cart";


const Bottles = () => {
    const [bottles,setBottles]=useState([]);
    const [cart,setCart]=useState([]);

    useEffect(()=>{
        fetch('bottles.json')
        .then(res=>res.json())
        .then(data=>setBottles(data))
    },[])

    useEffect(()=>{
        console.log('called the useEffect', bottles.length)
        if(bottles.length>0){
            const storedCart = getStoredCart();
        // console.log(storedCart,bottles)
        const  savedCart=[];
        for(const id of storedCart){
            console.log(id)
            const bottle = bottles.find(bottle=>bottle.id===id)
            if(bottle){
                savedCart.push(bottle)
            }
        }
        console.log('saved cart',savedCart)
        setCart(savedCart)
        }
    },[bottles])
    const handleAddToCart =bottle =>{
        const newCart = [...cart,bottle];
        setCart(newCart)
        addToLS(bottle.id)
    }

const handleRemoveToCart=id=>{
    const remainingCart = cart.filter(bottle=>bottle.id!==id)
    setCart(remainingCart)
    removeFromLS(id)
}



    return (
        <div>
            <h3>Bottles available here:{bottles.length} </h3>
            <Cart cart={cart} handleRemoveToCart={handleRemoveToCart}></Cart>


            <div className="bottle-container">
            {
                bottles.map(bottle=><Bottle
                bottle={bottle}
                key={bottle.id}
                handleAddToCart={()=>handleAddToCart(bottle)}
                ></Bottle>)
            }
            </div>
        </div>
    );
};

export default Bottles;