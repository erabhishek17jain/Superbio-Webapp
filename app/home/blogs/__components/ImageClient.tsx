"use client";
import blogPlaceholder from "@/public/blog-placeholder.png";

import Image from "next/image";
import { useState } from "react";

export const ImageClient = ({ src }: { src: string }) => {
  const [image, setImage] = useState(src);
  return (
    <Image
      src={image}
      onError={() => setImage(blogPlaceholder.src)}
      width={1000}
      height={1000}
      alt="blog"
      className="main-card-v3 h-[30vh] w-full object-cover object-center sm:h-[40vh] md:h-[50vh]"
    />
  );
};
