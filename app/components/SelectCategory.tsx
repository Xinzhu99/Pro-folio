"use client"
import { useRouter } from "next/navigation";
import { getCategories } from "../actions/categories";
import { useEffect, useState } from "react";
export default function SelectCategory () {

    const [categories, setCategories] = useState([])
    useEffect(( )=> {
        getCategories().then(setCategories)
    }, [])

    //utiliser useROuter pour modifier l'url inside un component client 
    const router = useRouter()

    function handleClick (e) {
        e.preventDefault()
        console.log(e.target.value)
        router.push(`/?category=${e.target.value}`)
    }

    return (
       <form onClick={handleClick}>
              <select name="category" id="category" defaultValue="tout" required className="border-1 py-2 px-5 rounded-4xl hover:bg-pink-300 cursor-pointer ">
                <option value="tout" >Tous les projects</option>
                {categories.map((item) => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </form>
    )
}