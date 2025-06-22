'use client';

import { useEffect, useState } from 'react';
import { BlogCard } from '../blogCard/page';
import axios from 'axios';

type Post = {
  _id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  date: string;
  author: string;
};

export default function Blogs() {
  const [allBlogs, setAllBlogs] = useState<Post[]>([]);
  const [hovered, setHovered] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentTab, setCurrentTab] = useState('All');
  const blogsPerPage = 6;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('https://quick-blog-chi.vercel.app/api/posts/read');
        const posts: Post[] = res.data.posts.map((post: any) => ({
          _id: post._id,
          title: post.title,
          description: post.description,
          image: post.image || `https://source.unsplash.com/random/400x200?sig=${post._id}`,
          tags: typeof post.tags === 'string' ? post.tags.split(' ') : post.tags,
          date: new Date(post.createdAt).toDateString(),
          author: post.user?.name || 'Unknown',
        }));
        setAllBlogs(posts);
      } catch (err) {
        console.error('Error fetching posts:', err);
      }
    };

    fetchPosts();
  }, []);

  const uniqueTags = Array.from(new Set(allBlogs.flatMap(blog => blog.tags || [])));
  const tabs = ['All', ...uniqueTags];

  const filteredBlogs =
    currentTab === 'All'
      ? allBlogs
      : allBlogs.filter(blog => blog.tags.includes(currentTab));

  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const handleTabClick = (tab: string, index: number) => {
    setCurrentTab(tab);
    setHovered(index);
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col items-center px-2 -mt-22">
      {/* Tabs */}
      <div className="hidden sm:block w-full max-w-3xl relative p-1 overflow-x-auto overflow-y-hidden whitespace-nowrap text-sm text-center fixed z-50 bg-white">
        <div
          className="absolute h-8 bg-[#5044E5] rounded-full z-0 transition-all duration-300 ease-in-out"
          style={{
            width: `${100 / tabs.length}%`,
            left: `${(100 / tabs.length) * (hovered !== null ? hovered : tabs.indexOf(currentTab))}%`,
            opacity: 1,
          }}
        />
        <div className="flex justify-between relative z-10">
          {tabs.map((tab, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => handleTabClick(tab, idx)}
              className={`w-1/6 py-2 text-center cursor-pointer transition-all duration-300 whitespace-nowrap ${
                (hovered !== null ? hovered === idx : currentTab === tab)
                  ? 'text-white'
                  : 'text-black hover:text-[#5044E5]'
              }`}
            >
              {tab}
            </div>
          ))}
        </div>
      </div>

      {/* Blog Section */}
      <div className="w-full mt-24 px-4 max-w-6xl">
        <h2 className="text-3xl font-bold mb-6 text-center sm:text-left">Posts</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentBlogs.map(blog => (
            <BlogCard
              key={blog._id}
              id={blog._id}
              title={blog.title}
              description={blog.description}
              image={blog.image}
              tags={blog.tags}
              date={blog.date}
              author={blog.author}
            />
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center m-12 gap-4 ">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
