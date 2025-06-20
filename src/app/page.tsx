import Blogs from "./components/blogs";
import BlogTop from "./components/blogTop";
import Entry from "./components/Entry";
import Footer from "./components/footer";

export default function Home() {
  return (
    <div className="">
      <BlogTop/>
      <Entry/>
      <Blogs/>  
      <Footer/>
    </div>
  );
}
