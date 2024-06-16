"use client";
import UserNetworkService from "@/services/user.service";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import React from "react";
import { BsArrowRight } from "react-icons/bs";

export default function InitialSetup() {
  const [number, setNumber] = React.useState<string>("");
  const [company, setCompany] = React.useState<Orgs>({
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
    <div className="flex flex-col">
      <div className="flex flex-col">
        <div className="flex flex-col">
          <label htmlFor="name">
            <span className="text-xs font-semibold capitalize">
              Company Name
            </span>
          </label>
          <input
            type="text"
            className=" bg-[#F7F7F7] outline-none text-sm p-3 px-4 mt-1 rounded-md"
            placeholder="Loqo ai"
            value={company.name}
            name="name"
            onChange={(e) => setCompany({ ...company, name: e.target.value })}
          />
        </div>

        <div className="flex flex-col mt-6">
          <label htmlFor="address">
            <span className="text-xs font-semibold capitalize">Address</span>
          </label>
          <input
            type="text"
            className=" bg-[#F7F7F7] outline-none text-sm p-3 px-4 mt-1 rounded-md"
            placeholder="123, Example Street, City, State, Country"
            value={company.description}
            name="address"
            onChange={(e) =>
              setCompany({ ...company, description: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col mt-6">
          <label htmlFor="email">
            <span className="text-xs font-semibold capitalize">
              Phone Number
            </span>
          </label>
          <input
            type="text"
            className=" bg-[#F7F7F7] outline-none text-sm p-3 px-4 mt-1 rounded-md"
            placeholder="Enter your phone number"
            name="phone"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col mt-6">
        <button
          onClick={submit}
          className="flex capitalize items-center font-semibold justify-center text-white text-xs p-3 px-5 border bg-black rounded-lg"
        >
          Getting Started <BsArrowRight className="ml-2" size={20} />
        </button>
      </div>
    </div>
  );
}
