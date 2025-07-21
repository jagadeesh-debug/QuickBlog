'use client';

import BlogTop from "../blogTop/page";
import Footer from "../footer/page";
import { useEffect, useState } from "react";
import BlogCard from "../blogCard/Blogcard";
import axios from "axios";

type Post = {
  _id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  date: string;
  author: string;
};

type RawPost = {
  _id: string;
  title: string;
  content: string;
  image?: string;
  tags: string | string[];
  createdAt: string;
  user?: {
    name?: string;
  };
};

export default function Myblogs() {
  const [myBlogs, setMyBlogs] = useState<Post[]>([]);
  const [selectPost, popSelectPost] = useState<Post | null>(null);



  useEffect(() => {

    const fetchMyPosts = async () => {
      try {
        const res = await axios.get('https://quick-blog-chi.vercel.app/api/posts/mine', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
        });

        const posts: Post[] = res.data.posts.map((post: RawPost) => ({
          _id: post._id,
          title: post.title,
          description: post.content || "",
          image: post.image || `https://source.unsplash.com/random/400x200?sig=${post._id}`,
          tags: typeof post.tags === 'string' ? post.tags.split(' ') : post.tags,
          date: new Date(post.createdAt).toDateString(),
          author: post.user?.name || 'You',
        }));

        setMyBlogs(posts);
      } catch (err) {
        console.error("Error fetching user posts:", err);
      }
    };

    fetchMyPosts();
  }, []);

  const open = (post: Post) => {
    popSelectPost(post)
    
  }
  const close = () => {
    popSelectPost(null)
  }

  // const update = (post: Post) => {

  // }
  return (
    <div>
      <BlogTop />
      <div className="w-full mt-24 px-4 max-w-6xl mx-auto min-h-[100vh]">
        <h2 className="text-3xl font-bold mb-6 text-center sm:text-left">My Posts</h2>

        {myBlogs.length === 0 ? (
          <p className="text-center text-gray-500">You haven&apos;t created any posts yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" >
            {myBlogs.map(blog => (
              <div
                key={blog._id}
                onClick={() => open(blog)}
                className="cursor-pointer">
                <BlogCard
                  key={blog._id}
                  id={blog._id}
                  title={blog.title}
                  description={blog.description}
                  image={blog.image}
                  tags={blog.tags}
                  date={blog.date}
                  author={blog.author}
                  showMeta={false}
                />
              </div>
            ))}
          </div>
        )}

        {selectPost && (
          <div onClick={close} className="inset-0 fixed backdrop-blur-md bg-black/30 flex justify-center items-center z-50 p-4">
            <div onClick={(e) => e.stopPropagation()}
              className=" rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 bg-white">
              {/* backgroudn Image */}
              <div
                className="h-64 w-full bg-cover bg-center rounded-md "
                style={{ backgroundImage: `url('${selectPost.image}')` }}
              ></div>

              {/* tags */}

              {/* details and buttons */}

              




              <h2 className="text-3xl font-bold mt-4">{selectPost.title}</h2>
              <p className="mt-6 whitespace-pre-line text-gray-800 ">{selectPost.description}</p>
              <div className="flex gap-2 mt-2">
                <button  className="bg-[#5044E5] rounded-md w-24 h-8 text-white  cursor-pointer ">Edit</button>
                <button onClick={close} className="bg-[#5044E5] rounded-md w-24 h-8 text-white  cursor-pointer ">Close</button>
              </div>

            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
