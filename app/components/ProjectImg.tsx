"use client";
import { useState } from "react";
export default function ProjectImg({imgSrc, defaultSrc}) {

  const [imgError, setImgError] = useState(false);

  return <>
  {imgError ? (
    <img 
    alt="thumbnail"
    src={defaultSrc}
    />
  ):(
  <img src={imgSrc}
  alt="thumbnail"
  onError={()=>setImgError(true)}
  
  />
)}
</>
}
