
import Blogs from "./components/blogs/page";
import BlogTop from "./components/blogTop/page";
import Footer from "./components/footer/page";
import Entry from "./components/Entry/page";

export default function Home() {
  return (
    <div >
      <BlogTop/>
      <Entry/>
      <Blogs />  
      <Footer/>
     
    </div>
  );
}
