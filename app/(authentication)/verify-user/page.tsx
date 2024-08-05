"use client"
import { useAppSelector } from "@/context";
import UserNetworkService from "@/services/user.service";
import { useSnackbar } from "notistack";
import React from "react";
import { BsArrowRight } from "react-icons/bs";

export default function VerifyUser() {
  const {enqueueSnackbar} = useSnackbar()
  const {user} = useAppSelector(state => state.user)
  const [otp, setOtp] = React.useState<string>("");

  const verifyUser = () => {
    UserNetworkService.instance.verifyEmail(otp, user.email).then(r => {
    }).catch(e => {
      enqueueSnackbar("Invalid OTP", {variant: "error"})
    })
  }

  return (
      <div className='flex flex-col'>
          <div className='flex flex-col'>
              <label htmlFor='email'>
                  <span className='text-xs font-semibold capitalize'>Enter your One-Time-Password sent to your email</span>
              </label>
              <input
                  type='text'
                  className='bg-[#F7F7F7] outline-none text-sm p-3 px-4 mt-1 rounded-md'
                  placeholder='123456'
                  name='otp'
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
              />
          </div>

          <div className='flex flex-col mt-6'>
              <button
                  onClick={verifyUser}
                  className='flex capitalize items-center font-semibold justify-center text-white text-xs p-3 px-5 border bg-black rounded-lg'>
                  Verify <BsArrowRight className='ml-2' size={20} />
              </button>
          </div>
      </div>
  );
}
