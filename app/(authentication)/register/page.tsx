"use client";
import { useAppDispatch, useAppSelector } from "@/context";
import { setUser } from "@/context/user";
import UserNetworkService from "@/services/user.service";
import { ArrowUpRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import React, { ChangeEvent } from "react";


export default function Register() {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const setKeyAndValue = (e: ChangeEvent<HTMLInputElement>) => {
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
                ? 'This email is already registered on LOQO Business. Please Sign in or sign up with a different email.'
                : err.response.data;
        enqueueSnackbar(error, { variant: 'error' });
      })
    } catch (error) {
      console.error("Registration error:", error);
      enqueueSnackbar("Registration failed", { variant: "error" });
    }
  };


  return (
      <div className='flex flex-col'>
          <div className='flex flex-col gap-2'>
              <label htmlFor='name'>
                  <span className='text-base font-semibold capitalize'>Name</span>
              </label>
              <input
                  type='text'
                  className='bg-[#F7F7F7] outline-none text-sm p-3 px-4 mt-1 rounded-md'
                  placeholder='Your name'
                  value={user.name}
                  name='name'
                  onChange={setKeyAndValue}
              />
          </div>

          <div className='flex flex-col gap-2 mt-6'>
              <label htmlFor='email'>
                  <span className='text-base font-semibold capitalize'>Email ID</span>
              </label>
              <input
                  type='text'
                  className='bg-[#F7F7F7] outline-none text-sm p-3 px-4 mt-1 rounded-md'
                  placeholder='Work email'
                  value={user.email}
                  name='email'
                  onChange={setKeyAndValue}
              />
          </div>

          <div className='flex flex-col gap-2 mt-6'>
              <label htmlFor='mobileno'>
                  <span className='text-base font-semibold capitalize'>Mobile Number</span>
              </label>
              <input
                  type='text'
                  className='bg-[#F7F7F7] outline-none text-sm p-3 px-4 mt-1 rounded-md'
                  placeholder='Your contact number'
                  value={user.mobileNo}
                  name='mobileNo'
                  onChange={setKeyAndValue}
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
                  name='password'
                  value={user.password}
                  onChange={setKeyAndValue}
              />
          </div>

          <div className='flex flex-col mt-6'>
              <button
                  onClick={register}
                  className='flex gap-2 capitalize items-center justify-center text-white text-xs font-semibold p-3 px-5 border bg-black rounded-lg'>
                  Sign Up <ArrowUpRightIcon color='#fff' size={20} />
              </button>
          </div>
      </div>
  );
}
