"use client";

import { useState, FormEvent } from "react";
import axios from "axios";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setErrorMsg("You must be logged in to create a post.");
        return;
      }

      const formData = {
        title,
        content,
        tags,
        // If you want to handle image upload, you'll need FormData and a file handler backend
      };

      const res = await axios.post(
        "https://quick-blog-chi.vercel.app/api/posts/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res)
      console.log(image)
      setSuccessMsg("Post created successfully!");
      window.location.href = "../components/myblogs";
      setTitle("");
      setContent("");
      setTags("");
      setImage(null);
    } catch (err: unknown) {
  if (axios.isAxiosError(err)) {
    setErrorMsg(err.response?.data?.message || "Failed to create post");
  } else {
    setErrorMsg("Failed to create post");
  }
}
  };

  return (
    <div className="w-full min-h-screen bg-[url('/assets/bg.png')] bg-center bg-no-repeat bg-[length:600px] sm:bg-[length:1000px] p-6 sm:p-16 flex justify-center items-center">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle className="text-center sm:text-2xl">Create a New Blog Post</CardTitle>
        </CardHeader>

        <CardContent>
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
            {successMsg && <p className="text-green-600 text-sm">{successMsg}</p>}

            {/* Post Title */}
            <div className="grid gap-2">
              <Label htmlFor="title">Post Title</Label>
              <Input
                id="title"
                placeholder="Enter the title of your post"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Post Content */}
            <div className="grid gap-2">
              <Label htmlFor="content">Post Content</Label>
              <Textarea
                id="content"
                placeholder="Write your blog here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>

            {/* Tags */}
            <div className="grid gap-2">
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                placeholder="e.g. tech, react, javascript"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>

            {/* Background Image Upload (Not yet wired) */}
            <div className="grid gap-2">
              <Label htmlFor="bg-pic">Upload Background Image</Label>
              <Input
                id="bg-pic"
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
              />
            </div>

            <Button className="w-full bg-[#5044E5]" type="submit">
              Create Post
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
