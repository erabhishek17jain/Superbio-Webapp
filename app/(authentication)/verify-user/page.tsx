"use client"
import { useAppSelector } from "@/context";
import UserNetworkService from "@/services/user.service";
import { ArrowRightIcon } from "lucide-react";
import { useSnackbar } from "notistack";
import React, { useState } from "react";

export default function VerifyUser() {
  const {enqueueSnackbar} = useSnackbar()
  const {user} = useAppSelector(state => state.user)
  const [otp, setOtp] = useState<string>("");

  const verifyUser = () => {
    UserNetworkService.instance.verifyEmail(otp, user.email).then(r => {
    }).catch(e => {
      enqueueSnackbar("Invalid OTP", {variant: "error"})
    })
  }

  return (
      <div className='flex flex-col'>
          <div className='flex flex-col gap-2'>
              <label htmlFor='email'>
                  <span className='text-base font-semibold capitalize'>One-Time-Password sent to your email</span>
              </label>
              <input
                  type='text'
                  className='bg-[#F7F7F7] outline-none text-sm p-3 px-4 mt-1 rounded-md'
                  placeholder='Enter 6 digit OTP'
                  name='otp'
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
              />
          </div>

          <div className='flex flex-col mt-6'>
              <button
                  onClick={verifyUser}
                  className='flex gap-2 capitalize items-center font-semibold justify-center text-white text-sm p-3 px-4 border bg-black rounded-lg'>
                  Verify <ArrowRightIcon color='#fff' size={20} />
              </button>
          </div>
      </div>
  );
}
