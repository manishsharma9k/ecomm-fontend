import React from "react";

export default function Product({ item }) {
    console.log(item);

    return (
        <>
            <div className="w-60 border-2 rounded hover:shadow-2xl">
                <div className="border-b-2 relative">
                    <img src={`${import.meta.env.VITE_BASE_API}/${item?.image?.url}`}
                        alt="" className=" w-full h-40 object-contain aspect-square" />
                    <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        {item.category?.name}
                    </span>
                </div>
                <div>
                    <h1 className="text-lg font-bold">{item.name}</h1>
                    <p>{item.description}</p>
                    <div>
                        <span className="text-xl font-bold text-green-500">{item.price}</span>
                        <span className="text-gray-500 font-medium line-through">{item.mrp}</span>
                        <span>{Math.floor(item.mrp - item.price)}</span>
                    </div>
                </div>
                <div className="flex justify-around my-2">
                    <button className="px-2 py-1 bg-white rounded-full">
                        ADD TO CART
                    </button>
                    <button className="px-2 py-1 bg-amber-400 rounded-full">
                        BUY NOW
                    </button>
                </div>

            </div>
        </>
    )
}