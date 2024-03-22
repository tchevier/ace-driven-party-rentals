'use client'
import React, { useEffect, useState } from "react";
import {collection, onSnapshot, query, QuerySnapshot} from "firebase/firestore"
import { db } from "../firebase"
interface Products {

    id: string;
    name: string;
    description: string;
    dimensions: string;
    images: string[];
    price: number;
    quantity: number;
    // Define other fields in your document here
  }
  
export default function DashboardPage() {
    const [products, setProducts] = useState<Products[]>([])
    useEffect(() => {
        
        const q = query(collection(db, "Products"))
        const cleanUp = onSnapshot(q, (QuerySnapshop) => {
            let productsArr: Products[] = []
            QuerySnapshop.forEach((doc) => {
                const data = doc.data();
                productsArr.push({...data, id: data.id, name: data.name, description: data.description, dimensions: data.dimensions, images: data.images, price: data.price, quantity: data.quantity})
            })
            console.log(productsArr)
            setProducts(productsArr)
        })
    }, [])
    return (
    <>
        {
            products.map(product => {
                return <div key={product.id} className="text-white">{product.name}</div>
            })
            
        }
    </>);
}
