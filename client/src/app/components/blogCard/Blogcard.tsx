  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { Badge } from "@/components/ui/badge";

  type BlogCardProps = {
    id: string;
    title: string;
    author: string;
    date: string;
    tags: string[];
    image: string;
    description: string;
    showMeta?:boolean
  };

  export default function BlogCard(props: BlogCardProps) {
    const { title, author, date, tags, image, description ,showMeta=true } = props;

    return (
      <Card className="w-full max-w-sm overflow-hidden shadow-lg cursor-pointer">
        {/* Background image */}
        <div
          className="h-40 w-full bg-cover bg-center"
          style={{ backgroundImage: `url('${image}')` }}
        ></div>

        {/* Tags */}
        <div className="flex gap-2 px-4 pt-2 flex-wrap">
          {tags.map((tag, idx) => (
            <Badge key={idx} variant="secondary">#{tag}</Badge>
          ))}
        </div>

        <CardHeader>
          <CardTitle className="text-xl">{title}</CardTitle>
            {showMeta &&(
          <CardDescription>
              Created by <span className="font-semibold">{author}</span> ·{" "}
            <span className="text-muted-foreground text-sm">{date}</span>
            {/* Truncated description inside card */}
          </CardDescription>)}
            <p className="mt-2 text-gray-700 line-clamp-1">{description}</p>
        </CardHeader>

        <CardContent>
          {/* You can add more if needed */}
        </CardContent>
      </Card>
    );
  }
