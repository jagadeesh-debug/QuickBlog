import { Button } from "../../components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Textarea } from "../../components/ui/textarea"

export function CreatePost() {
  return (
    <div className="w-full min-h-screen bg-[url('/assets/bg.png')] bg-center bg-no-repeat bg-[length:600px] sm:bg-[length:1000px] p-6 sm:p-16 flex justify-center items-center">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle className="text-center sm:text-2xl">Create a New Blog Post</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-6">
            {/* Post Title */}
            <div className="grid gap-2">
              <Label htmlFor="title">Post Title</Label>
              <Input id="title" placeholder="Enter the title of your post" required />
            </div>

            {/* Post Content */}
            <div className="grid gap-2">
              <Label htmlFor="content">Post Content</Label>
              <Textarea id="content"  placeholder="Write your blog here..." required />
            </div>

            {/* Tags */}
            <div className="grid gap-2">
              <Label htmlFor="tags">Tags</Label>
              <Input id="tags" placeholder="e.g. tech, react, javascript" />
            </div>

            {/* Background Image Upload */}
            <div className="grid gap-2">
              <Label htmlFor="bg-pic">Upload Background Image</Label>
              <Input id="bg-pic" type="file" accept="image/*" />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-[#5044E5]" type="submit">Create Post</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
