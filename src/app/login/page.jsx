"use client";
import { useState } from "react";
import { NextResponse } from "next/server";
import { useRouter } from "next/navigation";
import axios from "axios";
export default function Loginpage() {
  const route=useRouter()
  const [user, setuser] = useState({
    email: "",
    password: "",
  });
  const hanglelogin = async (e) => {
    e.preventDefault();
    try {
      const axiosres=await axios.post("/api/user/login",user)
      if(!axiosres) return NextResponse.json({error:"Axios side error"},{status:400})
        route.push(`/profile/${axiosres.data._id}`)
      return NextResponse.json(axiosres)
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <>
      <div className="dark:bg-gray-900 dark:text-white h-screen flex justify-center items-center">
        <form onSubmit={hanglelogin} className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg w-96">
          <h1 className="text-3xl font-bold my-4">Login</h1>
          <label className="block text-lg my-2" htmlFor="email">
            Email
          </label>
          <input
            className="block w-full px-4 py-2 border border-white rounded-lg"
            type="email"
            id="email"
            onChange={(e) => {
              setuser({ ...user, email: e.target.value });
            }}
          />
          <label className="block text-lg my-2" htmlFor="password">
            Password
          </label>
          <input
            className="block w-full px-4 py-2 border border-white rounded-lg"
            type="password"
            id="password"
            onChange={(e) => {
              setuser({ ...user, password: e.target.value });
            }}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full my-4"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
}
