"use client";

import { Button } from "@/components/ui/button";
import { BlogList } from "@/constants";
import { scrollToElementById } from "@/lib/utils";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { BlogCard } from "./BlogCard";
import { BlogHeroSection } from "./BlogHeroSection";

const ITEM_PER_PAGE: number = 8;
const TOTAL_ITEM = BlogList.length;

export const AllBlogs = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );
  const page = searchParams.get("page");
  const [currentPage, setCurrentPage] = useState(page ? parseInt(page) : 0);
  const prevPage = () => {
    if (currentPage === 0) {
      return;
    }
    setTimeout(() => {
      scrollToElementById("top-of-page");
    }, 100);
    setCurrentPage((prev) => prev - 1);
    router.push(pathname + "?" + createQueryString("page", (currentPage - 1).toString()));
  };
  const nextPage = () => {
    if (currentPage === Math.ceil(TOTAL_ITEM / ITEM_PER_PAGE) - 1) {
      return;
    }
    setTimeout(() => {
      scrollToElementById("top-of-page");
    }, 100);
    setCurrentPage((prev) => prev + 1);
    router.push(pathname + "?" + createQueryString("page", (currentPage + 1).toString()));
  };
  return (
    <>
      <div className="w-full overflow-hidden px-6 sm:px-12 md:px-16 lg:px-16">
        <BlogHeroSection />
        <div className="mt-20 grid w-full gap-x-4 sm:grid-cols-2 md:gap-x-10 xl:grid-cols-3">
          {BlogList.slice(currentPage * ITEM_PER_PAGE, (currentPage + 1) * ITEM_PER_PAGE).map(
            (blog) => (
              <BlogCard key={blog.path} blog={blog} />
            ),
          )}
        </div>
      </div>
      <div className="relative z-50 mt-auto flex w-full items-center justify-center gap-x-4 pt-28">
        <Button
          variant="ghost"
          size="default"
          className="rounded-none border border-black bg-black text-white hover:bg-black hover:text-white hover:opacity-85"
          onClick={prevPage}
          disabled={currentPage === 0}
        >
          <ArrowLeftIcon />
        </Button>
        <Button
          variant="ghost"
          size="default"
          className="rounded-none border border-black bg-black text-white hover:bg-black hover:text-white hover:opacity-85"
          onClick={nextPage}
          disabled={currentPage === Math.ceil(TOTAL_ITEM / ITEM_PER_PAGE) - 1}
        >
          <ArrowRightIcon />
        </Button>
      </div>
    </>
  );
};
