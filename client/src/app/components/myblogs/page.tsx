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
  const [isEditing, setEditing] = useState(false);
  const [editTitle, setTitle] = useState("");
  const [editDescription, setDescription] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = myBlogs.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(myBlogs.length / postsPerPage);

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
    popSelectPost(post);
    setEditing(false);
    setTitle(post.title);
    setDescription(post.description);
  };

  const close = () => {
    popSelectPost(null);
  };

  const saveUpdate = async () => {
    if (!selectPost) return;
    try {
      await axios.put(`https://quick-blog-chi.vercel.app/api/posts/${selectPost._id}`, {
        title: editTitle,
        content: editDescription,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      });

      const updatedPosts = myBlogs.map(post =>
        post._id === selectPost._id
          ? { ...post, title: editTitle, description: editDescription }
          : post
      );

      setMyBlogs(updatedPosts);
      popSelectPost({ ...selectPost, title: editTitle, description: editDescription });
      setEditing(false);
    } catch (error) {
      console.error("Failed to update post:", error);
    }
  };

  return (
    <div>
      <BlogTop />
      <div className="w-full mt-24 px-4 max-w-6xl mx-auto min-h-[100vh]">
        <h2 className="text-3xl font-bold mb-6 text-center sm:text-left">My Posts</h2>

        {myBlogs.length === 0 ? (
          <p className="text-center text-gray-500">You haven&apos;t created any posts yet.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentPosts.map(blog => (
                <div
                  key={blog._id}
                  onClick={() => open(blog)}
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
                    showMeta={false}
                  />
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center mt-8 gap-4">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="bg-gray-200 px-4 py-2 rounded disabled:opacity-50"
              >
                Prev
              </button>
              <span className="font-semibold text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="bg-gray-200 px-4 py-2 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}

        {/* Post Details Modal */}
        {selectPost && (
          <div onClick={close} className="inset-0 fixed backdrop-blur-md bg-black/30 flex justify-center items-center z-50 p-4">
            <div
              onClick={(e) => e.stopPropagation()}
              className="rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 bg-white"
            >
              <div
                className="h-64 w-full bg-cover bg-center rounded-md"
                style={{ backgroundImage: `url('${selectPost.image}')` }}
              ></div>

              {isEditing ? (
                <div className="mt-4">
                  <input
                    className="w-full text-2xl font-bold border border-gray-300 rounded px-2 py-1 mb-4"
                    value={editTitle}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <textarea
                    className="w-full border border-gray-300 rounded px-2 py-2 h-40"
                    value={editDescription}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={saveUpdate}
                      className="bg-green-600 rounded-md w-24 h-8 text-white cursor-pointer"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditing(false)}
                      className="bg-gray-400 rounded-md w-24 h-8 text-white cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-4">
                  <h2 className="text-3xl font-bold">{selectPost.title}</h2>
                  <p className="mt-6 whitespace-pre-line text-gray-800">{selectPost.description}</p>
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => setEditing(true)}
                      className="bg-[#5044E5] rounded-md w-24 h-8 text-white cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={close}
                      className="bg-[#5044E5] rounded-md w-24 h-8 text-white cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
