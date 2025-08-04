"use client";
import { use, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";
export default function Signuppage() {
  const [user, setuser] = useState({
    email: "",
    username: "",
    password: "",
  });
const router=useRouter()
  const handlesignup = async (e) => {
    e.preventDefault();
    try {
      const axiosres=await axios.post("/api/user/signup",user)
      if(!axiosres) return NextResponse.json({error:"Axios side error"},{status:400})
        router.push("/login")
      console.log(axiosres)
      return NextResponse.json(axiosres)     
    } catch (error) {
      console.log(error)    
    }
  };
  return (
    <>
      <div className="dark:bg-gray-900 dark:text-white h-screen flex justify-center items-center">
        <form
          onSubmit={handlesignup}
          className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg w-96"
        >
          <h1 className="text-3xl font-bold my-4">Signup</h1>
          <label className="block text-lg my-2" htmlFor="email">
            Email
          </label>
          <input
            className="block w-full px-4 py-2 border border-white rounded-lg"
            type="email"
            id="email"
            value={user.email}
            onChange={(e) => {
              setuser({ ...user, email: e.target.value });
            }}
          />
          <label className="block text-lg my-2" htmlFor="username">
            Username
          </label>
          <input
            className="block w-full px-4 py-2 border border-white rounded-lg"
            type="text"
            id="username"
            value={user.username}
            onChange={(e) => {
              setuser({ ...user, username: e.target.value });
            }}
          />
          <label className="block text-lg my-2" htmlFor="password">
            Password
          </label>
          <input
            className="block w-full px-4 py-2 border border-white rounded-lg"
            type="password"
            id="password"
            value={user.password}
            onChange={(e) => {
              setuser({ ...user, password: e.target.value });
            }}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full my-4"
            type="submit"
          >
            Signup
          </button>
        </form>
      </div>
    </>
  );
}
