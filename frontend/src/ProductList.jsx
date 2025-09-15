import React,{useState,useEffect} from 'react'
import axios from 'axios'
import ShowMsg from './component/ShowMsg';
import './App.css'
import NavBar from './show/NavBar';


function ProductList() {
    const [searchTerm , setSearchTerm] = useState('');
    const [loading , setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [filtered, setFiltered] = useState([]);
   

     useEffect (()=>{
        axios.get('https://fakestoreapi.com/products')
        .then(res =>{
            setProducts(res.data);
            setFiltered(res.data);
            setLoading(false)
         })
         .catch(err =>{
            console.error("Error fetching products", err);
            setLoading(false);
         });
     },[]);


     useEffect(()=>{
        const result = products.filter(product =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFiltered(result)
     },[searchTerm,products])
     

    


  return (
    <div className='min-h-screen bg-gray-100 p-6'>
       
        
        
        <div className='flex justify-between mb-6 mt-5'>
            <input 
            type="text"
            placeholder='Search for items like shirt,watch,etc. '
             value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full max-w-md px-4 py-2 border rounded shadow'
            />
            {/* <AddCart/> */}
           {/* <button className=' bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex justify-between '>
             🛒 Cart-Item
           </button> */}
        </div>
        {loading ?(
            <p className='text-center text-lg'>Loading...</p>
        ):(
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                {filtered.length>0 ? filtered.map(product => (
                    <div key={product.id} className='bg-white p-4 rounded h-110 shadow hover:scale-105 transition' >
                        <img 
                        src={product.image}
                        alt={product.title} 
                        className='h-48 w-full object-contain mb-4'
                        />
                        <h2 className='text-lg font-semibond'>{product.title}</h2>
                        <p className='text-sm text-gray-600 line-clamp-2'>{product.description}</p>
                        <p className='text-green-700 font-bold mt-2'>₹{Math.round(product.price*80)}</p>
                          
                            <ShowMsg/>
                          
                    </div>
                )):(
                  <p className='text-center col-span-full text-red-500'>No product found </p>
                )}

            </div>
        )};
    </div>
  );
};

export default ProductList