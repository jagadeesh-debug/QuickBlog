import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Login from "./login"
import SignUp from "./signup"

export default function AuthTabs(){

return (
<Tabs defaultValue="account" className=" w-screen h-screen flex sm:items-center sm:justify-center">
  <TabsList className="w-1/6  ">
    <TabsTrigger value="account" className="cursor-pointer">Login</TabsTrigger>
    <TabsTrigger value="password" className="cursor-pointer">SignUp</TabsTrigger>
  </TabsList>
  <TabsContent value="account">
    <Login/>
  </TabsContent>
  <TabsContent value="password">
    <SignUp/>
    </TabsContent>
</Tabs>
)}
