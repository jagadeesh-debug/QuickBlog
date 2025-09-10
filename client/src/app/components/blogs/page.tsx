'use client';

import { useEffect, useState } from 'react';
import BlogCard from '../blogCard/Blogcard';
import axios from 'axios';
import Entry from '../Entry/page';

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

export default function Blogs() {
  const [allBlogs, setAllBlogs] = useState<Post[]>([]);
  const [hovered, setHovered] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentTab, setCurrentTab] = useState('All');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [slidingTags, setSlidingTags] = useState<string[]>([]); // max 4 tags here
  const blogsPerPage = 6;
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('https://quick-blog-chi.vercel.app/api/posts/read');
        const posts: Post[] = res.data.posts.map((post: RawPost) => ({
          _id: post._id,
          title: post.title,
          description: post.content || "",
          image: post.image || `https://source.unsplash.com/random/400x200?sig=${post._id}`,
          tags: typeof post.tags === 'string' ? post.tags.split(' ') : post.tags,
          date: new Date(post.createdAt).toDateString(),
          author: post.user?.name || 'Unknown',
        }));
        setAllBlogs(posts);

        // Extract unique tags from posts
        const uniqueTags = Array.from(new Set(posts.flatMap(blog => blog.tags || [])));

        // Initialize slidingTags with first 4 tags or less
        setSlidingTags(uniqueTags.slice(0, 4));
      } catch (err: unknown) {
        console.error('Error fetching posts:', err);
      }
    };

    fetchPosts();
  }, []);

  // Full tabs array always 5 items: "All" + slidingTags (max 4)
  const tabs = ['All', ...slidingTags];

  // Filter blogs by current tab
  const filteredBlogs =
    currentTab === 'All'
      ? allBlogs
      : allBlogs.filter(blog => blog.tags.includes(currentTab));

  // Pagination calculation
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

  // On tab click: if new tag, add it slidingTags as a queue of max 4
  const handleTabClick = (tab: string, index: number) => {
    setCurrentTab(tab);
    setHovered(index);
    setCurrentPage(1);

    if (tab === 'All') return; // no change if 'All'

    if (!slidingTags.includes(tab)) {
      // Add new tag to slidingTags queue of max length 4
      setSlidingTags(prev => {
        const newTags = [...prev, tab];
        if (newTags.length > 4) {
          newTags.shift(); // remove oldest
        }
        return newTags;
      });
    }
  };

  const openPopup = (post: Post) => {
    setSelectedPost(post);
  };

  const closePopup = () => {
    setSelectedPost(null);
  };


  return (
    <div className="flex flex-col items-center px-2 -mt-22">
        <Entry/>
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
              className={`w-1/5 py-2 text-center cursor-pointer transition-all duration-300 whitespace-nowrap ${
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
      <div className  ="w-full mt-24 px-4 max-w-6xl">
        <h2 className="text-3xl font-bold mb-6 text-center sm:text-left">Posts</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentBlogs.map(blog => (
            <div
              key={blog._id}
              onClick={() => openPopup(blog)}
              className="cursor-pointer"
            >
              <BlogCard
                id={blog._id}
                title={blog.title}
                description={blog.description}
                image={blog.image}
                tags={blog.tags}
                date={blog.date}
                author={blog.author}
                showMeta={true}
              />
            </div>
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

      {/* Popup Modal for full post */}
      {selectedPost && (
        <div
          onClick={closePopup}
          className="fixed inset-0 backdrop-blur-md bg-opacity-50 flex justify-center items-center z-50 p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg- rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6"
          >
            {/* Image */}
            <div
              className="h-64 w-full bg-cover bg-center rounded-md"
              style={{ backgroundImage: `url('${selectedPost.image}')` }}
            ></div>

            {/* Tags */}
            <div className="flex gap-2 pt-4 flex-wrap">
              {selectedPost.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm font-semibold"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Title, author, date */}
            <h2 className="text-3xl font-bold mt-4">{selectedPost.title}</h2>
            <p className="text-gray-600 mt-1">
              Created by <span className="font-semibold">{selectedPost.author}</span> ·{' '}
              <span className="text-sm">{selectedPost.date}</span>
            </p>

            {/* Full description with line breaks */}
            <p className="mt-6 whitespace-pre-line text-gray-800">{selectedPost.description}</p>

            <button
              onClick={closePopup}
              className="mt-6 px-6 py-2 bg-[#5044E5] text-white rounded hover:bg-[#4237c4] cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
