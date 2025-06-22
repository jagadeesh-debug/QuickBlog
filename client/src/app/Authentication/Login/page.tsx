"use client";

import { useState, FormEvent } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

import { loginSuccess } from "@/app/store/authslice";
import { AppDispatch } from "@/app/store/store";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [successMsg, setSuccessMsg] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    try {
      // 1. Login to get token
      const response = await axios.post("https://quick-blog-chi.vercel.app/api/auth/login", {
        email,
        password,
      });

      const { token } = response.data;
      localStorage.setItem("token", token);
      
      // 2. Fetch user data with the token
      try {
        const userResponse = await axios.get("https://quick-blog-chi.vercel.app/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        const userData = userResponse.data;
        
        // 3. Dispatch both token and user data to Redux
        dispatch(loginSuccess({
          token,
          user: {
            name: userData.name || email.split('@')[0], // Fallback if name not provided
            email: userData.email || email,
            mobile: userData.mobile || ""
          }
        }));
        
        setSuccessMsg("Login successful!");
        router.push("/");
      } catch (userError) {
        // If we can't get user data, still login with basic info
        dispatch(loginSuccess({
          token,
          user: {
            email: email,
            name: email.split('@')[0] // Use part of email as name fallback
          }
        }));
        router.push("/");
      }
    } catch (error: any) {
      setErrorMsg(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-[url('/assets/bg.png')] bg-center bg-no-repeat bg-[length:600px] sm:bg-[length:1000px] p-6 sm:p-32 flex justify-center"
    >
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-6">
            {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
            {successMsg && <p className="text-green-600 text-sm">{successMsg}</p>}

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
                  Forgot your password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full bg-[#5044E5] cursor-pointer">
            Login
          </Button>
          <Button variant="outline" className="w-full cursor-pointer">
            Login with Google
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}