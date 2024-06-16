import React from "react";
import PublicNetworkService from "@/services/public.service";
import PublicForm from "@/components/PublicForm";

export default async function Form(props: { params: { campaignId: string } }) {
  const data = await PublicNetworkService.instance.getPublicForm(
    props.params.campaignId
  );
  return (
      <div className='flex justify-center items-center my-2 mx-auto w-[400px] mt-5 flex-col text-black'>
          <h1 className='text-xl font-semibold'>{data.campaignName}</h1>
          <div className='flex flex-col w-full'>
              <PublicForm data={data} campaignId={props.params.campaignId} />
          </div>
      </div>
  );
}
