'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function BlogTop() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);
  const home =()=>router.push('/');
  const handleLogin = () => router.push("../../Authentication/Auth");
  const handleProfile = () => router.push("../components/profile");
  const handleCreate = () => router.push("../components/createPost");
  const handleBlogs = () =>router.push("../components/myblogs");

  return (
    <div className="flex justify-between p-2 items-center">
      <div className="text-xl font-semibold cursor-pointer" onClick={home}>QuickBlog</div>

      {isLoggedIn ? (
        <div className="flex gap-3">
          <button onClick={handleCreate} className="bg-green-600 text-white px-3 py-1 rounded-md cursor-pointer">
            Create Post
          </button>
          <button onClick={handleBlogs} className="bg-green-600 text-white px-3 py-1 rounded-md cursor-pointer">
            MyBlogs
          </button>
          <button onClick={handleProfile} className="bg-blue-600 text-white px-3 py-1 rounded-md cursor-pointer">
            Profile
          </button>
        </div>
      ) : (
        <div
          onClick={handleLogin}
          className="bg-[#5044E5] rounded-md w-24 text-center cursor-pointer"
        >
          <button className="text-white py-1 w-full cursor-pointer">Login</button>
        </div>
      )}
    </div>
  );
}
