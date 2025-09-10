
"use client"
// import { useState } from "react"

// type prop={
//     title:string
// }
export default function Entry(){
    

    // const [q,setQ] = useState("")
    // const [result,setResult] = useState([])

    // const handleSearch = async ()=>{
    //     if(!q.trim()) return 
    //     const res = await fetch("https://quick-blog-chi.vercel.app/api/posts/search")
    //     const data = await res.json();
    //     setResult(data);
    // }
    return (
        <div className="flex flex-col  items-center   bg-[url('/assets/bg.png')] bg-center  bg-no-repeat bg-[length:600px] p-12 sm:bg-[length:800px] sm:p-52" >
            {/* title space */}
            <div className=" sm:w-1/2  md:w-full flex flex-col font-bold text-center  px-2 pt-12 sm:py-4  ">
                <h1 className="text-xl sm:text-3xl">Your own <span className="text-[#5044E5]">blogging </span></h1>
                <h1 className="text-xl sm:text-3xl text-center ">Platform.</h1>
            </div>
            {/* caption space */}
            <div className="flex text-wrap sm:px-2 py-4  sm:w-1/2 md:w-1/2 lg:w-1/3  text-center">
            <h3 className="text-[12px] text-gray">This is your space to think out loud, to share what matters, and to write without f'ilters. Whether it's one word or a thousand, your story starts right here </h3>
            </div>
            {/* search blogs */}
            {/* <div className=" flex border border-gray-300  h-12 sm:w-1/2  justify-between md:px-2 py-1 sm:py-1  rounded-md">
                <input className="text-sm text-gray-500 ml-1 outline-none w-full " placeholder="Search Blogs" value={q} onChange={(e)=>setQ(e.target.value)}/>
                <div className="text-white bg-[#5044E5] text-12 text-center h-8     py-1 h-10 sm:h-10 border border-2 mr-3 sm:mr-1  rounded-md w-32    sm:w-1/4 md:w-1/2 cursor-pointer " onClick={handleSearch}>
                    Search
                </div>
            </div> */}
        </div>
    )
}

// 