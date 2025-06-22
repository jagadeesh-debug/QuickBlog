"use client";

import { useState, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import axios from "axios";

import { loginSuccess } from "@/app/store/authslice";
import { AppDispatch } from "@/app/store/store";

import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";

export default function SignUp() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  
  // Form state
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  
  // Status messages
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      // 1. Register the user
      const registerResponse = await axios.post("https://quick-blog-chi.vercel.app/api/auth/signup", {
        name,
        email,
        mobile, // Include mobile in registration data
        password,
      });

      // 2. If registration successful, log the user in
      console.log(registerResponse)
      const loginResponse = await axios.post("https://quick-blog-chi.vercel.app/api/auth/login", {
        email,
        password,
      });
    

      const { token } = loginResponse.data;
      
      // 3. Store token in localStorage
      localStorage.setItem("token", token);
      
      // 4. Store user data in Redux including mobile
      dispatch(loginSuccess({
        token,
        user: {
          name,
          email,
          mobile
        }
      }));
      
      // 5. Redirect to home page
      router.push("/");
      
    } catch (error: unknown) {
      console.error("Signup error:", error);
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg("Failed to create account. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-[url('/assets/bg.png')] bg-center bg-no-repeat bg-[length:600px] sm:bg-[length:1000px] p-6 sm:p-12 flex justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Create your account</CardTitle>
            <CardDescription>
              Enter your details below to create your account
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="flex flex-col gap-6">
              {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
              
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              
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
                <Label htmlFor="mobile">Mobile Number</Label>
                <Input
                  id="mobile"
                  type="tel"
                  placeholder="89898989999"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>
              
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
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
            <Button 
              type="submit" 
              className="w-full bg-[#5044E5] cursor-pointer"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
            <Button variant="outline" className="w-full cursor-pointer" type="button">
              Sign up with Google
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}