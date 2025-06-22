import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function BlogCard() {
  return (
    <Card className="w-full max-w-sm overflow-hidden shadow-lg cursor-pointer">
      {/* Background image */}
      <div
        className="h-40 w-full bg-cover bg-center"
        style={{ backgroundImage: "url('https://source.unsplash.com/random/400x200')" }}
      ></div>

      {/* Tags */}
      <div className="flex gap-2 px-4 pt-2">
        <Badge variant="secondary">#React</Badge>
        <Badge variant="secondary">#NextJS</Badge>
        <Badge variant="secondary">#UI</Badge>
      </div>

      <CardHeader>
        <CardTitle className="text-xl">Awesome Post Title</CardTitle>
        <CardDescription>
          Created by <span className="font-semibold">Jagadeesh</span> ·{" "}
          <span className="text-muted-foreground text-sm">June 22, 2025</span>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <p>
          This is a sample description of the post. You can replace this with actual
          content related to your blog or article.
        </p>
      </CardContent> 
    </Card>
  )
}
