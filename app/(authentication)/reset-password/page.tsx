'use client'
import { useAppSelector } from "@/context";
import UserNetworkService from "@/services/user.service";
import { useRouter, useSearchParams } from "next/navigation";
import { useSnackbar } from "notistack";
import React, { useEffect } from "react";
import { BsArrowRight } from "react-icons/bs";

export default function ResetPassword() {
  const [password, setPassword] = React.useState<string>("");
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");
  const {user} = useAppSelector(state => state.user)
  const {enqueueSnackbar} = useSnackbar()
  const router = useRouter()
  const query = useSearchParams()

  useEffect(() => {
    if (!query.get("token")) {
      router.push("/login");
    }
  }, [query])

  const handleResetPassword = () => {
    const token = query.get("token");
    if (!token) {
      return;
    }
    if (password !== confirmPassword) {
      enqueueSnackbar("Passwords do not match", {variant: "error"})
      return;
    }
    UserNetworkService.instance.resetPassword(token, password).then((res) => {
      router.push("/login")
    }).catch((err) => {
      enqueueSnackbar("Password reset failed", {variant: "error"})
    })
  }

  return (
      <div className='flex flex-col'>
          <div className='flex flex-col gap-2'>
              <label htmlFor='email'>
                  <span className='text-base font-semibold capitalize'>New Password</span>
              </label>
              <input
                  type='password'
                  className='bg-[#F7F7F7] outline-none text-sm p-3 px-4 mt-1 rounded-md'
                  placeholder='Password (at least 8  chatacters)'
                  onChange={(e) => {
                      setPassword(e.target.value);
                  }}
              />
          </div>

          <div className='flex flex-col gap-2 mt-6'>
              <label htmlFor='email'>
                  <span className='text-base font-semibold capitalize'>Confirm new password</span>
              </label>
              <input
                  type='password'
                  className='bg-[#F7F7F7] outline-none text-sm p-3 px-4 mt-1 rounded-md'
                  placeholder='Password (at least 8  chatacters)'
                  onChange={(e) => {
                      setConfirmPassword(e.target.value);
                  }}
              />
          </div>

          <div className='flex flex-col mt-6'>
              <button
                  onClick={handleResetPassword}
                  className='flex capitalize items-center font-semibold justify-center text-white text-base p-3 px-5 border bg-black rounded-lg'>
                  Reset Password <BsArrowRight className='ml-2' size={20} />
              </button>
          </div>
      </div>
  );
}
