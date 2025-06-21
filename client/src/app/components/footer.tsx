export default function Footer() {
    return (
        <div className=" flex flex-col font-thin bg-gray-100">
            <div className=" flex flex-col  md:flex-row justify-between p-2">
                <div className="footer1 flex flex-col">
                    <h1 className="text-sm font-bold md:font-thin md:text-xl">QuickBlog</h1>
                    <div className=" text-[12px] md:text-3md text-balance w-2/3">
                        a blog based on userfriendly approach and integrated with ai for better experince and workflow
                    </div>
                </div>
                {/* quickLinks */}
                <div className="flex flex-col">
                    <h1 className="text-sm font-bold md:font-thin md:text-xl">QucikLinks</h1>
                    <h2 className="text-[12px] md:text-[13px]">Home</h2>
                    <h2 className="text-[12px] md:text-[13px]">Best Sellers</h2>
                    <h2 className="text-[12px] md:text-[13px]">Offers</h2>
                    <h2 className="text-[12px] md:text-[13px]">contact us</h2> 
                    <h2 className="text-[12px] md:text-[13px]">FAQs</h2>
                </div>
                {/* need info */}
                <div className="flex flex-col">
                    <h1 className="font-bold md:font-thin text-sm md:text-xl">Need help?</h1>
                    <h2 className="text-[12px] md:text-[13px]">Delivery Information</h2>
                    <h2 className="text-[12px] md:text-[13px]">Return & refund policy</h2>
                    <h2 className="text-[12px] md:text-[13px]">payment Methods</h2>
                    <h2 className="text-[12px] md:text-[13px]">Track Your Order</h2>
                    <h2 className="text-[12px] md:text-[13px]">Contact us</h2>
                </div>
                {/* social media handles */}
                <div className="flex flex-col">
                    <h1 className="font-bold md:font-thin text-sm md:text-xl">Follow us</h1>
                    <h2 className="text-[12px] md:text-[13px]">Instagram</h2>
                    <h2 className="text-[12px] md:text-[13px]">Twitter</h2>
                    <h2 className="text-[12px] md:text-[13px]">Facebook</h2>
                    <h2 className="text-[12px] md:text-[13px]">YouTube</h2>
                </div>
            </div>
            <div className="flex  h border border-gray-400"></div>
            <div className="text-sm text-center">Copyright 2025 QuickBlog all rights Reserved</div>
        </div>
    )
}