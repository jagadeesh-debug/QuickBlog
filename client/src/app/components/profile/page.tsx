"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Label } from "../../../components/ui/label";
import { RootState } from "@/app/store/store";
import { logout } from "@/app/store/authslice";

export default function Profile() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, isLoggedIn } = useSelector((state: RootState) => state.auth);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  // Handle logout
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    router.push("/");
  };

  // Handle edit profile
  const handleEditProfile = () => {
    router.push("/");
  };

  // Early return if not authenticated or no user data
  if (!isLoggedIn || !user) {
    return null;
  }

  return (
    <div className="w-full bg-[url('/assets/bg.png')] bg-center bg-no-repeat bg-[length:600px] sm:bg-[length:1000px] p-12 sm:p-32 flex justify-center">
      <Card className="w-full max-w-md p-6">
        <CardHeader className="flex flex-col items-center">
          <CardTitle className="text-center text-xl">{user.name || "User"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-1">
            <Label className="text-muted-foreground">Name</Label>
            <p className="font-medium">{user.name || "Not available"}</p>
          </div>
          <div className="grid gap-1">
            <Label className="text-muted-foreground">Email</Label>
            <p className="font-medium">{user.email || "Not available"}</p>
          </div>
          <div className="grid gap-1">
            <Label className="text-muted-foreground">Mobile</Label>
            <p className="font-medium">{user.mobile || "Not available"}</p>
          </div>
          <div className="pt-1">
            <Button onClick={handleEditProfile} className="w-full cursor-pointer bg-[#5044E5]">
              Edit Profile
            </Button>
          </div>
          <div className="pt-1">
            <Button onClick={handleLogout} className="w-full cursor-pointer bg-[#5044E5]">
              Log Out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}