// import bg from "../../../public/assets/bg.png"
export default function Entry(){
    return (
        <div className="flex flex-col w-screen items-center " >
            {/* title space */}
            <div className=" sm:w-1/2 md:w-1/3 flex flex-col font-bold text-center  px-2 pt-12 sm:py-4 " style={{backgroundImage:`url(/assets/bg.png)`}}>
                <h1 className="text-xl sm:text-3xl">Your own <span className="text-[#5044E5]">blogging </span></h1>
                <h1 className="text-xl sm:text-3xl text-center ">Platform.</h1>
            </div>
            {/* caption space */}
            <div className="flex text-wrap px-2 py-4 w-4/5 sm:w-1/2 md:w-1/3  text-center">
            <h3 className="text-[12px] text-gray">This is your space to think out loud, to share what matters, and to write without filters. Whether it’s one word or a thousand, your story starts right here </h3>
            </div>
            {/* search blogs */}
            <div className=" flex border border-gray-300 w-2/3 sm:w-1/3 justify-between md:px-2 py-1 rounded-md">
                <input className="text-sm text-gray-500 ml-1 " placeholder="Search Blogs"/>
                <div className="text-white bg-[#5044E5] text-12 text-center h-1/2 border border-2 mr-3  rounded-md w-32 sm:w-1/4 cursor-pointer">
                    Search
                </div>
            </div>
        </div>
    )
}

// 