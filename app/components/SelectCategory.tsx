"use client"
import { useRouter } from "next/navigation";
import { getCategories } from "../actions/categories";
import { useEffect, useState } from "react";

interface Category {
  id: number,
  name:string,
}

export default function SelectCategory () {

    const [categories, setCategories] = useState<Category[]>([])
    useEffect(( )=> {
        getCategories().then(setCategories)
    }, [])

    //utiliser useROuter pour modifier l'url inside un component client 
    const router = useRouter()

    function handleChange (e: React.ChangeEvent<HTMLSelectElement>) {
        console.log(e.target.value)
        router.push(`/?category=${e.target.value}`)
    }

    return (
       <form  className="hover: cursor-pointer border-1 rounded-full">
              <select 
              name="category" 
              id="category" 
              defaultValue="tout" 
              required 
              onChange={handleChange}
              className="border-1px py-2 px-5 rounded-4xl hover:bg-pink-300 cursor-pointer ">
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