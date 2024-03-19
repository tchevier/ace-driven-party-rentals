'use client'
import React, { useEffect, useState } from "react";
import {collection, onSnapshot, query, QuerySnapshot} from "firebase/firestore"
import { db } from "../firebase"
interface Slip {

    id: string;
    // Define other fields in your document here
  }
  
export default function DashboardPage() {
    const [items, setItems] = useState<Slip[]>([])
    useEffect(() => {
        
        const q = query(collection(db, "slips"))
        const cleanUp = onSnapshot(q, (QuerySnapshop) => {
            let itemsArr: Slip[] = []
            QuerySnapshop.forEach((doc) => {
                itemsArr.push({...doc.data(), id: doc.id })
            })
            console.log(itemsArr)
            setItems(itemsArr)
        })
    }, [])
    return (
    <>
        {
            items.map(slip => {
                return <div key={slip.id} className="text-white">{slip.id} hi</div>
            })
            
        }
    </>);
}
