import React,{useState,useEffect} from 'react'
import ProductList from '../ProductList';

function ShowMsg(pro) {
     const [isAdded, setIsAdded] = useState(null);
    const [message, setMessage] = useState("");
    
    
    const clicked = (id,title) =>{
      if (isAdded=== id) {
      setIsAdded(null); 
      // showMessage(`Product is  removed from Cart`)
      alert("Product remove to cart")
    } else {
      setIsAdded(id);
      //showMessage(`Product is  Added to Cart`);
      alert("Product add to cart")
    }};
    const showMessage = (msg) =>{
        setMessage(msg);
        setTimeout(() => {
            setMessage("");
        },2000);
    };

 
    return (
        <>
          {message && (
    <div className="bg-green-200 text-green-800 py-2 px-4 rounded shadow">
      {message}
    </div>
    )}
       <div  className=' bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex justify-end'>
         <button
            className="bg-gray-200 px-2 rounded"
            onClick={()=>clicked(pro.id,pro.title)}
            >
             { isAdded === pro.id ? "✅" : "➕"}
        </button>
        </div>
        </>
        
  )
}

export default ShowMsg