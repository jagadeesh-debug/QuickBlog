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

  return (
    <div>
      <BlogTop />

      <div className="w-full mt-24 px-4 max-w-6xl mx-auto min-h-[100vh]">
        <h2 className="text-3xl font-bold mb-6 text-center sm:text-left">My Posts</h2>

        {myBlogs.length === 0 ? (
          <p className="text-center text-gray-500">You haven't created any posts yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" >
            {myBlogs.map(blog => (
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
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
