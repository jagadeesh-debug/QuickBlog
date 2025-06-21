import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export default function Profile() {
  return (
    <div className="w-full bg-[url('/assets/bg.png')] bg-center bg-no-repeat bg-[length:600px] sm:bg-[length:1000px] p-12   sm:p-32 flex justify-center ">
      <Card className="w-full max-w-md p-6">
        <CardHeader className="flex flex-col items-center">
          <img
            src="https://via.placeholder.com/100"
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover mb-4 border"
          />
          <CardTitle className="text-center text-xl">John Doe</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-1">
            <Label className="text-muted-foreground">Name</Label>
            <p className="font-medium">John Doe</p>
          </div>
          <div className="grid gap-1">
            <Label className="text-muted-foreground">Email</Label>
            <p className="font-medium">johndoe@example.com</p>
          </div>
          <div className="pt-6">
            <Button className="w-full cursor-pointer">Edit Profile</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
