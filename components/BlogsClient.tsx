"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { BlogList as BL, BlogProps } from "@/constants";
import { motion, useInView } from "framer-motion";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { RefObject, useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";

const BlogList = BL.slice(0, 5);

export const BlogsClient = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
      <section
          id='blogs'
          ref={ref}
          className='relative flex w-full flex-col items-center justify-center gap-y-20 px-6 xs:px-12 sm:px-12 md:px-16 lg:px-24'>
          <motion.div
              initial={{ opacity: 0, y: '100%' }}
              animate={isInView ? { opacity: 1, y: '0%' } : { opacity: 0, y: '100%' }}
              transition={{ delay: 0.25, duration: 0.25, type: 'spring' }}
              className='mr-auto flex w-full flex-col gap-y-3'>
              <h3 className='text-xl font-semibold text-black'>Our blogs</h3>
              <p className='text-md w-full font-medium text-neutral-500 sm:w-3/4 lg:w-3/5 xl:w-1/2'>
                  Explore our diverse range of blogs, covering Instagram influencer tips, algorithm insights, and more!
              </p>
          </motion.div>
          <Carousel
              opts={{
                  align: 'start',
              }}
              className='w-full'>
              <CarouselContent>
                  {BlogList.map((blog, index) => (
                      <CarouselItem key={index} className='md:basis-1/2 lg:basis-1/3'>
                          <div className='p-1'>
                              <BlogCard key={index} blog={blog} parentRef={ref} index={index} />
                          </div>
                      </CarouselItem>
                  ))}
              </CarouselContent>
              <div className='relative flex w-full items-center justify-center pt-6'>
                  <div className='relative flex w-fit items-center'>
                      <CarouselPrevious />
                      <CarouselNext />
                  </div>
              </div>
          </Carousel>
      </section>
  );
};

export const BlogCard = ({
  blog,
  parentRef,
  index,
}: { blog: BlogProps } & { parentRef: RefObject<HTMLElement>; index: number }) => {
  const router = useRouter();
  const isInView = useInView(parentRef, { once: true });
  return (
      <motion.div
          initial={{ opacity: '50%', x: '100%' }}
          animate={isInView ? { opacity: 1, x: '0%' } : { opacity: 0, x: '100%' }}
          transition={{ delay: 0.025 * index, duration: 0.025, type: 'spring' }}
          id='hover-effect'
          className='group col-span-1 flex w-full flex-col gap-y-5 rounded p-6 pl-8 transition-all duration-300 hover:bg-black hover:text-white'>
          <div className='why-box aspect-[5/4] w-full border-2 border-black'>
              <Image src={blog.images[0]} alt='blog' className='h-full object-cover' />
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
      </motion.div>
  );
};

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState(745);
  useEffect(() => {
    function handleResize() {
      setWindowSize(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
};
