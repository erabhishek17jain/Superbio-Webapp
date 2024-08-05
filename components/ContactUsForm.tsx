"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRightIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { motion, useInView } from "framer-motion";
import { RefObject } from "react";

const formSchema = z.object({
  email: z.string().email(),
});

export const ContactUsForm = ({ parentRef }: { parentRef: RefObject<HTMLElement> }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const isInView = useInView(parentRef, { once: true });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
      <motion.div
          initial={{ opacity: 0, x: '-100%' }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: '-100%' }}
          transition={{ delay: 0.5, duration: 1, type: 'spring' }}
          className='flex w-full flex-col items-start justify-center gap-y-6 sm:gap-y-10 lg:w-3/4 xl:w-1/2'>
          <div className='flex flex-col gap-y-3'>
              <h3 className='text-2xl font-medium text-black'>Your data. Your Cloud</h3>
              <p className='text-base font-light text-sm sm:text-base text-neutral-500'>
                  All your Campaign & Influencer Data stays in your cloud. Only you & your selected employees can access the data.
              </p>
          </div>
          <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className='flex justify-start w-full gap-x-3 sm:w-4/5 mb-8 sm:mb-16'>
                  {/* <FormField
                      control={form.control}
                      name='email'
                      render={({ field }) => (
                          <FormItem className='w-full'>
                              <FormControl>
                                  <Input
                                      type='email'
                                      {...field}
                                      placeholder='Type in your email here'
                                      className='rounded-none border-2 border-black bg-transparent py-5 placeholder:text-xs placeholder:text-neutral-500'
                                  />
                              </FormControl>
                              <FormMessage />
                          </FormItem>
                      )}
                  /> */}
                  <Button
                      variant='default'
                      size='lg'
                      type='submit'
                      className='flex items-center gap-x-2 rounded-none bg-black text-xs font-semibold uppercase text-white'>
                      Know more
                      <ArrowRightIcon className='size-4' />
                  </Button>
              </form>
          </Form>
      </motion.div>
  );
};
