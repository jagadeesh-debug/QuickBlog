import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import Login from "../Login/page";
import SignUp from "../signup/page";   

export default function AuthTabs() {
  return (
    <div className="">
      <Tabs defaultValue="account" className="p-2 flex items-center h-screen  " >
        <TabsList className="flex border bg-[#5044E5] w-1/2 h-10 sm:w-1/6 mt-12 ">
          <TabsTrigger value="account" className="cursor-pointer ">Login</TabsTrigger>
          <TabsTrigger value="password" className="cursor-pointer">SignUp</TabsTrigger>
        </TabsList>
                        
        <TabsContent value="account" className="mt-0 w-screen p-1">
            <Login/>
        </TabsContent>
        <TabsContent value="password" className="mt-0 w-screen p-1">
          <SignUp/>
        </TabsContent>
      </Tabs>
    </div>
  );
}