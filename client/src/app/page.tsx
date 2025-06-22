import { Tabs } from "@radix-ui/react-tabs";
import Login from "./Authentication/Login/page";
import Blogs from "./components/blogs/page";
import BlogTop from "./components/blogTop/page";
import Footer from "./components/footer/page";
import AuthTabs from "./Authentication/Auth/page";
import Entry from "./components/Entry/page";
import { CreatePost } from "./components/createPost/page";

export default function Home() {
  return (
    <div >
      <BlogTop/>
      <Entry/>
      <Blogs />  
      <Footer/>
      {/* <AuthTabs/>
      <CreatePost/> */}
    </div>
  );
}
