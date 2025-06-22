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

  const handleLogin = () => router.push("/login");
  const handleProfile = () => router.push("/profile");
  const handleCreate = () => router.push("/create-post");

  return (
    <div className="flex justify-between p-2 items-center">
      <div className="text-xl font-semibold">QuickBlog</div>

      {isLoggedIn ? (
        <div className="flex gap-3">
          <button onClick={handleCreate} className="bg-green-600 text-white px-3 py-1 rounded-md cursor-pointer">
            Create Post
          </button>
          <button onClick={handleCreate} className="bg-green-600 text-white px-3 py-1 rounded-md cursor-pointer">
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
          <button className="text-white py-1 w-full">Login</button>
        </div>
      )}
    </div>
  );
}
