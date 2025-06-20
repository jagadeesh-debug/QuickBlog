// import bg from "../../../public/assets/bg.png"
export default function Entry(){
    return (
        <div className="flex flex-col w-screen items-center " >
            {/* title space */}
            <div className=" w-1/2 flex justify-center border px-2 py-4 border" style={{backgroundImage:`url(/assets/bg.png)`}}>
                <h1 className="text-3xl">Your own <p className="text-[#5044E5]">blogginng</p>platform.</h1>
            </div>
            {/* caption space */}
            <div className="flex text-wrap px-2 py-4 w-1/2  text-center">
            <h3 className="text-sm text-gray">This is your space to think out loud, to share what matters, and to write without filters. Whether it’s one word or a thousand, your story starts right here </h3>
            </div>
            {/* search blogs */}
            <div className=" flex border border-2 w-1/3 justify-between px-2 py-1 rounded-md">
                <input className="text-sm text-gray-500 " placeholder="Search Blogs"/>
                <div className="text-white bg-[#5044E5] text-12 text-center h-1/2 border border-2 mr-8 rounded-md w-1/4 cursor-pointer">
                    Search
                </div>
            </div>
        </div>
    )
}

// 