"use client";
import { useAppDispatch, useAppSelector } from "@/context";
import { setUser } from "@/context/user";
import {login as userLogin} from "@/context/user/network"
import Link from "next/link";
import React, { ChangeEvent } from "react";
import { BsArrowRight } from "react-icons/bs";
import { useSnackbar } from "notistack";

export default function Login() {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const setKeyAndValue = (e: ChangeEvent<HTMLInputElement>) => {
    const copyUser = JSON.parse(JSON.stringify(user));
    copyUser[e.target.name] = e.target.value;
    dispatch(setUser(copyUser))
  }

  const login = async () => {
    try {
      if (!user.email) {
        return enqueueSnackbar("Please enter Email ID", { variant: "error" });
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
      <div className='flex flex-col'>
          <div className='flex flex-col gap-2'>
              <label htmlFor='email'>
                  <span className='text-base font-semibold capitalize'>Email ID</span>
              </label>
              <input
                  type='text'
                  className='bg-[#F7F7F7] outline-none text-sm p-3 px-4 mt-1 rounded-md'
                  placeholder='Work email'
                  value={user.email}
                  onChange={setKeyAndValue}
                  name='email'
              />
          </div>
          <div className='flex flex-col gap-2 mt-6'>
              <label htmlFor='email'>
                  <span className='text-base font-semibold capitalize'>Password</span>
              </label>
              <input
                  type='password'
                  className='bg-[#F7F7F7] outline-none text-sm p-3 px-4 mt-1 rounded-md'
                  placeholder='Password (at least 8  chatacters)'
                  value={user.password}
                  onChange={setKeyAndValue}
                  name='password'
              />
          </div>

          <div className='flex flex-col mt-6'>
              <button
                  onClick={login}
                  className='flex capitalize items-center font-semibold justify-center text-white text-base p-3 px-5 border bg-black rounded-lg'>
                  Sign In <BsArrowRight className='ml-2' size={20} />
              </button>
          </div>

          <div className='flex flex-col mt-4'>
              <Link href={'/forgot-password'} className='text-sm flex items-center justify-center underline'>
                  Forget password?
              </Link>
          </div>
      </div>
  );
}
