"use client";
import { Button } from "@/components/ui/button";
import { BlogProps } from "@/constants";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const BlogCard = ({ blog }: { blog: BlogProps }) => {
  const router = useRouter();

  return (
      <div
          id='hover-effect'
          className='group col-span-1 flex w-full flex-col gap-y-5 rounded p-6 pl-8 transition-all duration-300 hover:bg-black hover:text-white'>
          <div className='why-box aspect-[5/4] w-full border-2 border-black'>
              <Image src={blog.images[1]} alt='blog' className='h-full object-cover' />
          </div>
          <div className='w-full'>
              <p className='text-sm font-medium uppercase group-hover:text-neutral-200'>{blog.title}</p>
              <p className='text-xs capitalize text-neutral-500 group-hover:text-neutral-200'>{blog.designation}</p>
              <p className='mt-2 text-[0.7rem] text-neutral-500 group-hover:text-neutral-200'>{blog.author}</p>
              <Button
                  className='flex gap-x-2 bg-transparent p-0 text-xs font-medium uppercase hover:bg-transparent hover:opacity-85 group-hover:text-white'
                  variant='ghost'
                  onClick={() => router.push(`/home/blogs/${blog.path}`)}>
                  read more
                  <ArrowRightIcon className='size-4' />
              </Button>
          </div>
      </div>
  );
};
