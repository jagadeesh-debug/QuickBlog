import { Tabs } from "@radix-ui/react-tabs";
import Login from "./Authentication/login";
import SignUp from "./Authentication/signup";
import Blogs from "./components/blogs";
import BlogTop from "./components/blogTop";
import Entry from "./components/Entry";
import Footer from "./components/footer";
import AuthTabs from "./Authentication/Auth";
import Profile from "./components/profile";
import { CreatePost } from "./components/createPost";

export default function Home() {
  return (
    <div >
      <BlogTop/>
      <Entry/>
      <Blogs />  
      <Footer/>
      {/* <AuthTabs/>
      <Profile/>
      <CreatePost/> */}
    </div>
  );
}
