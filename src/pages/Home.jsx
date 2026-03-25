import React from 'react'
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import ProductCard from '../components/ProductCard';

function Home() {
    const [categories, setCategory] = useState([]);
    const [products, setProducts] = useState([]);


    const getAllCategory = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/category/all")
            console.log(res);
            if (res.data.success) {
                setCategory(res.data.category);
            }
        } catch (error) {
            console.log(error);
        }

    }

      const getAllProduct = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/product/all")
            console.log(res);
            if (res.data.success) {
                setProducts(res.data.products);
            }
        } catch (error) {
            console.log(error);
        }

    };

    useEffect(() => {
        getAllCategory();
        getAllProduct();
    }, [])

    return (
        <div className='p-10 my-5'>
            <div className='bg-amber-200 w-full h-[40vh] flex items-center justify-center rounded-2xl'>
                <h1 className='text-4xl font-black'>Products</h1>
            </div>
            <div className='mt-5'>
                <h1 className='text-2xl text-center'>AllCategory</h1>
                <div className='flex item-center gap-3 mt-4'>
                    {categories?.map((item) => (
                        <div key={item._id}>
                            <img src={import.meta.env.VITE_BASE_API+"/"+item?.image?.url} className='h-20 w-20' alt="" />
                            <h2>{item.name}</h2>
                        </div>
                    ))}
                </div>
            </div>

            <div className='mt-5'>
                <h1 className='text-2xl text-center font-bold'>All Product</h1>
                <div className='flex items-center gap-3 mt-4'>
                    {products.map((p) => (
                    <ProductCard key={p._id} item= {p}/>

                    ))}
                </div>
            </div>
        </div>

    )
}

export default Home