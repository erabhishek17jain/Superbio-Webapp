"use client";
import { useAppDispatch, useAppSelector } from "@/context";
import { setUser } from "@/context/user";
import {login as userLogin} from "@/context/user/network"
import Link from "next/link";
import React from "react";
import { BsArrowRight } from "react-icons/bs";
import { useSnackbar } from "notistack";

export default function Login() {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const setKeyAndValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const copyUser = JSON.parse(JSON.stringify(user));
    copyUser[e.target.name] = e.target.value;
    dispatch(setUser(copyUser))
  }

  const login = async () => {
    try {
      if (!user.email) {
        return enqueueSnackbar("Please enter email id", { variant: "error" });
      }
      if (!user.password) {
        return enqueueSnackbar("Please enter password", { variant: "error" });
      }
  
      const payload = {
        email: user.email,
        password: user.password,
      };
      dispatch(userLogin(payload));
    } catch (error) {
      console.error("Login error:", error);
      enqueueSnackbar("Login failed", { variant: "error" });
    }
  };
  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <label htmlFor="email">
          <span className="text-xs font-semibold capitalize">Email id</span>
        </label>
        <input
          type="text"
          className=" bg-[#F7F7F7] outline-none text-sm p-3 px-4 mt-1 rounded-md"
          placeholder="hello@loqo.ai"
          value={user.email}
          onChange={setKeyAndValue}
          name="email"
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
          value={user.password}
          onChange={setKeyAndValue}
          name="password"
        />
      </div>

      <div className="flex flex-col mt-6">
        <button onClick={login} className="flex capitalize items-center font-semibold justify-center text-white text-xs p-3 px-5 border bg-black rounded-lg">
          Log in <BsArrowRight className="ml-2" size={20} />
        </button>
      </div>

      <div className="flex flex-col mt-4">
        <Link
          href={"/forgot-password"}
          className="text-sm flex items-center justify-center"
        >
          Forget password?
        </Link>
      </div>
    </div>
  );
}
