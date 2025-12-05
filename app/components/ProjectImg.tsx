"use client";
import { useState } from "react";

interface ProjectImgProps {
  imgSrc: string;
  defaultSrc: string;
}
export default function ProjectImg({imgSrc, defaultSrc}: ProjectImgProps) {

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
