"use client";
import UserNetworkService from '@/services/user.service';
import { useRouter, useSearchParams } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import React, { useEffect } from 'react'
import { BsArrowRight } from 'react-icons/bs'

export default function AccountSetup() {
  const [password, setPassword] = React.useState<string>("");
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");
  const query = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (!query.get("token")) {
      router.push("/login");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const submit = async () => {
    const token = query.get("token");
    if (!token) {
      return;
    }
    if (password !== confirmPassword) {
      enqueueSnackbar("Passwords do not match", { variant: "error" });
      return;
    }

    await UserNetworkService.instance.resetPassword(token, password).then(() => {
      enqueueSnackbar("Password set successfully", { variant: "success" });
      router.push("/login");
    }).catch(() => {
      enqueueSnackbar("Error setting password", { variant: "error" });
    });
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-col mt-6">
        <label htmlFor="email">
          <span className="text-xs font-semibold capitalize">New Password</span>
        </label>
        <input
          type="password"
          className=" bg-[#F7F7F7] outline-none text-sm p-3 px-4 mt-1 rounded-md"
          placeholder="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>

      <div className="flex flex-col mt-6">
        <label htmlFor="email">
          <span className="text-xs font-semibold capitalize">Confirm new password</span>
        </label>
        <input
          type="password"
          className=" bg-[#F7F7F7] outline-none text-sm p-3 px-4 mt-1 rounded-md"
          placeholder="password"
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
      </div>


      <div className="flex flex-col mt-6">
        <button onClick={submit} className="flex capitalize items-center justify-center text-white text-xs font-semibold p-3 px-5 border bg-black rounded-lg">
          Finish Account Setup <BsArrowRight className="ml-2" size={20} />
        </button>
      </div>
    </div>
  )
}
