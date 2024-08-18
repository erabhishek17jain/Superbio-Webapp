"use client";
import { Orgs } from "@/interfaces/user";
import UserNetworkService from "@/services/user.service";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import React, { useState } from "react";
import { BsArrowRight } from "react-icons/bs";

export default function InitialSetup() {
  const [number, setNumber] = useState<string>("");
  const [company, setCompany] = useState<Orgs>({
    name: "",
    description: "",
  });
  const router = useRouter();

  const submit = async () => {
    if (number.length !== 10) {
      enqueueSnackbar("Invalid number", { variant: "error" });
      return;
    }
    if (!company.name) {
      enqueueSnackbar("Company name required", { variant: "error" });
      return;
    }
    if (!company.description) {
      enqueueSnackbar("Company address required", { variant: "error" });
      return;
    }

    await UserNetworkService.instance.addOrgs(company).then(async () => {
      await UserNetworkService.instance.addPhoneToUser(number).then(() => {
        enqueueSnackbar("Account setup successfull", { variant: "success" });
        router.push("/");
      });
    });
  }

  return (
      <div className='flex flex-col'>
          <div className='flex flex-col'>
              <div className='flex flex-col gap-2'>
                  <label htmlFor='name'>
                      <span className='text-base font-semibold capitalize'>Company Name</span>
                  </label>
                  <input
                      type='text'
                      className='bg-[#F7F7F7] outline-none text-sm p-3 px-4 mt-1 rounded-md'
                      placeholder='Your company name'
                      value={company.name}
                      name='name'
                      onChange={(e) => setCompany({ ...company, name: e.target.value })}
                  />
              </div>

              <div className='flex flex-col gap-2 mt-6'>
                  <label htmlFor='address'>
                      <span className='text-base font-semibold capitalize'>Address</span>
                  </label>
                  <input
                      type='text'
                      className='bg-[#F7F7F7] outline-none text-sm p-3 px-4 mt-1 rounded-md'
                      placeholder='Your address'
                      value={company.description}
                      name='address'
                      onChange={(e) => setCompany({ ...company, description: e.target.value })}
                  />
              </div>
              <div className='flex flex-col gap-2 mt-6'>
                  <label htmlFor='email'>
                      <span className='text-base font-semibold capitalize'>Phone Number</span>
                  </label>
                  <input
                      type='text'
                      className='bg-[#F7F7F7] outline-none text-sm p-3 px-4 mt-1 rounded-md'
                      placeholder='Your phone number'
                      name='phone'
                      value={number}
                      onChange={(e) => setNumber(e.target.value)}
                  />
              </div>
          </div>

          <div className='flex flex-col mt-6'>
              <button
                  onClick={submit}
                  className='flex capitalize items-center font-semibold justify-center text-white text-base p-3 px-5 border bg-black rounded-lg'>
                  Getting Started <BsArrowRight className='ml-2' size={20} />
              </button>
          </div>
      </div>
  );
}
