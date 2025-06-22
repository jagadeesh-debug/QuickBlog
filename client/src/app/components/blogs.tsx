'use client';

import { useState } from 'react';
import { BlogCard } from './blogCard';

export default function Blogs() {
  const tabs = ['All', 'Technology', 'StartUp', 'LifeStyle', 'Finance'];
  const [hovered, setHovered] = useState<number | null>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  // Dummy blog data (replace with real data or props)
  const allBlogs = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    title: `Blog Post ${i + 1}`,
    author: `Author ${i + 1}`,
    date: 'June 22, 2025',
    tags: ['Tech', 'NextJS'],
    image: 'https://source.unsplash.com/random/400x200?sig=' + i,
    description: 'This is a dummy blog post.',
  }));

  const totalPages = Math.ceil(allBlogs.length / blogsPerPage);
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = allBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  return (
    <div className="flex flex-col items-center px-2 -mt-22">
      {/* Tabs */}
      <div className="hidden sm:block w-1/2 relative p-1 overflow-hidden text-sm text-center fixed z-50 bg-white">
        <div
          className="absolute h-8 bg-[#5044E5] rounded-full z-0 transition-all duration-300 ease-in-out"
          style={{
            width: `${100 / tabs.length}%`,
            left: `${(100 / tabs.length) * (hovered ?? 0)}%`,
            opacity: hovered !== null ? 1 : 0,
          }}
        />
        <div className="flex justify-between relative z-10">
          {tabs.map((tab, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
              className={`w-1/6 py-2 text-center cursor-pointer transition-all duration-300 ${
                hovered === idx ? 'text-white' : 'text-black hover:text-[#5044E5]'
              }`}
            >
              {tab}
            </div>
          ))}
        </div>
      </div>

      {/* Blog Section */}
      <div className="w-full mt-24 px-4 max-w-6xl">
        {/* Title */}
        <h2 className="text-3xl font-bold mb-6 text-center sm:text-left">Posts</h2>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentBlogs.map(blog => (
            <BlogCard key={blog.id} {...blog} />
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
