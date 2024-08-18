"use client";
import { cn, scrollToElementById } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { SocialLinks, ContactInfo } from "./constants";

export const RightFooter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const handleClick = (id: string) => {
    if (pathname === '/home/blogs') {
        if (id === 'blogs') return;
        router.push('../#' + id);
    } else if (pathname.includes('blogs') && pathname.length > 6) {
        if (id === 'blogs') router.push('../home/blogs');
        else router.push('../../#' + id);
    } else {
        if (id === 'blogs') {
            router.push('/home/blogs');
        } else {
            scrollToElementById(id);
        }
    }
  };

  return (
    <div className="flex items-start justify-between gap-10 lg:w-1/2 xl:px-4">
      {SocialLinks.map((list) => (
        <div key={list.title} className="flex flex-col gap-y-5">
          <h3 className="text-base font-semibold mb-4">{list.title}</h3>
          <div className="flex flex-col gap-y-3">
            {list.links.map((link, index) => (
              <div className="text-sm" key={index}>
                <button
                  onClick={() => handleClick(link.id)}
                  className={cn(!link.isValid && "pointer-events-none")}
                >
                  {link.title}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="flex flex-col gap-y-5">
        <h3 className="text-base font-semibold mb-4">Contact Information</h3>
        <div className="flex flex-col gap-y-3">
          {ContactInfo.map((line, index) => (
            <div className="text-sm" key={index}>
              <p>{line}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
