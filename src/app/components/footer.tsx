export default function Footer() {
    return (
        <div className="w-screen flex flex-col">
            <div className="w-screen flex justify-around">
                <div className="footer1 flex flex-col">
                    <h1 className="text-xl">QuickBlog</h1>
                    <div className=" text-balance w-2/3">
                        a blog based on userfriendly approach and integrated with ai for better experince and workflow
                    </div>
                </div>
                {/* quickLinks */}
                <div className="flex flex-col">
                    <h1 className="text-xl">QucikLinks</h1>
                    <h2 className="text-sm">Home</h2>
                    <h2 className="text-sm">Best Sellers</h2>
                    <h2 className="text-sm">Offers</h2>
                    <h2 className="text-sm">contact us</h2>
                    <h2 className="text-sm">FAQs</h2>
                </div>
                {/* need info */}
                <div className="flex flex-col">
                    <h1 className="text-xl">Need help?</h1>
                    <h2 className="text-sm">Delivery Information</h2>
                    <h2 className="text-sm">Return & refund policy</h2>
                    <h2 className="text-sm">payment Methods</h2>
                    <h2 className="text-sm">Track Your Order</h2>
                    <h2 className="text-sm">Contact us</h2>
                </div>
                {/* social media handles */}
                <div className="flex flex-col">
                    <h1 className="text-xl">Follow us</h1>
                    <h2 className="text-sm">Instagram</h2>
                    <h2 className="text-sm">Twitter</h2>
                    <h2 className="text-sm">Facebook</h2>
                    <h2 className="text-sm">YouTube</h2>
                </div>
            </div>
            <div className="flex w-screen h border border-black"></div>
            <div className="text-sm text-center">Copyright 2025 QuickBlog all rights Reserved</div>
        </div>
    )
}