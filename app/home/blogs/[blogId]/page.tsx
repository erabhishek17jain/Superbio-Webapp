import { Navbar } from "@/components/Navbar";
import bgImage from "@/public/background.svg";
import { ArticleBody } from "../__components/ArticleBody";
import { ImageClient } from "../__components/ImageClient";

interface BlogPageProps {
  params: {
    blogId: string;
  };
}

const BlogPage = async ({ params }: BlogPageProps) => {
  return (
    <main
      style={{
        backgroundImage: `url(${bgImage.src})`,
      }}
      className="min-h-screen w-full overflow-hidden bg-contain bg-fixed bg-repeat pb-40"
    >
      <Navbar />
      <div className="flex w-full flex-col overflow-hidden px-6 sm:px-12 md:px-16 lg:px-24">
        <ImageClient src={`/home/blogs/${params.blogId}/image1.png`} />
        <div className="mt-16 flex w-full flex-col gap-y-4 px-6 sm:px-12 md:px-16 lg:px-24">
          <ArticleBody path={params.blogId} />I
        </div>
      </div>
    </main>
  );
};

export default BlogPage;
