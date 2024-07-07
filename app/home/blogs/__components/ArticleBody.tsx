import fs from "fs";
import { marked } from "marked";

export const ArticleBody = ({ path }: { path: string }) => {
  const markdown = fs.readFileSync(process.cwd() + "/public/blogs/" + path + "/blog.md", "utf-8");

  return (
    <article
      className="prose mx-auto mt-8 w-full"
      dangerouslySetInnerHTML={{ __html: marked.parse(markdown) }}
    />
  );
};
