"use client";
import { useAppDispatch, useAppSelector } from "@/context";
import { setUser } from "@/context/user";
import UserNetworkService from "@/services/user.service";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import React from "react";
import { BsArrowRight } from "react-icons/bs";


export default function Register() {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const setKeyAndValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const copyUser = JSON.parse(JSON.stringify(user));
    copyUser[e.target.name] = e.target.value;
    dispatch(setUser(copyUser));
  };

  const register = async () => {
    try {

      if (!user || !user.password || !user.email || !user.name || !user.mobileNo) {
        enqueueSnackbar("Please fill all details")
        return
      }
      if (!user.email.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)) {
        enqueueSnackbar("Please enter a valid email address")
        return 
      }
      if (!user.mobileNo) {
        enqueueSnackbar("Please enter a valid Mobile number");
        return 
      }

     
      const payload = {
        name: user.name,
        email: user.email,
        password: user.password,
        role: "user",
        mobileNo: user.mobileNo,
      };
      UserNetworkService.instance.register(payload).then((res) => {
        router.push("/verify-user")
      }).catch((err) => {
        const error =
            err.response.data === 'User already exists'
                ? 'This email is already registered on LOQO Business. Please log in or sign up with a different email.'
                : err.response.data;
        enqueueSnackbar(error, { variant: 'error' });
      })
    } catch (error) {
      console.error("Registration error:", error);
      enqueueSnackbar("Registration failed", { variant: "error" });
    }
  };


  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <label htmlFor="name">
          <span className="text-xs font-semibold capitalize">Name</span>
        </label>
        <input
          type="text"
          className=" bg-[#F7F7F7] outline-none text-sm p-3 px-4 mt-1 rounded-md"
          placeholder="John Doe"
          value={user.name}
          name="name"
          onChange={setKeyAndValue}
        />
      </div>

      <div className="flex flex-col mt-6">
        <label htmlFor="email">
          <span className="text-xs font-semibold capitalize">Email id</span>
        </label>
        <input
          type="text"
          className=" bg-[#F7F7F7] outline-none text-sm p-3 px-4 mt-1 rounded-md"
          placeholder="hello@loqo.ai"
          value={user.email}
          name="email"
          onChange={setKeyAndValue}
        />
      </div>

      <div className="flex flex-col mt-6">
        <label htmlFor="mobileno">
          <span className="text-xs font-semibold capitalize">
            Mobile Number
          </span>
        </label>
        <input
          type="text"
          className=" bg-[#F7F7F7] outline-none text-sm p-3 px-4 mt-1 rounded-md"
          placeholder="+91 9876543210"
          value={user.mobileNo}
          name="mobileNo"
          onChange={setKeyAndValue}
        />
      </div>

      <div className="flex flex-col mt-6">
        <label htmlFor="email">
          <span className="text-xs font-semibold capitalize">Password</span>
        </label>
        <input
          type="password"
          className=" bg-[#F7F7F7] outline-none text-sm p-3 px-4 mt-1 rounded-md"
          placeholder="password"
          name="password"
          value={user.password}
          onChange={setKeyAndValue}
        />
      </div>

      <div className="flex flex-col mt-6">
        <button onClick={register} className="flex capitalize items-center justify-center text-white text-xs font-semibold p-3 px-5 border bg-black rounded-lg">
          Sign Up <BsArrowRight className="ml-2" size={20} />
        </button>
      </div>
    </div>
  );
}
