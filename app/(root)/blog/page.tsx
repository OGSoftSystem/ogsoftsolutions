import MaxWidthContainer from "@/components/MaxWidthContainer";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { cache, cachedPosts } from "@/lib/cache";
import BlogAdminBar from "@/components/atom/BlogAdminBar";
import PostShowCase from "@/components/atom/PostShowCase";
import { Metadata } from "next";
import { PostType } from "@/type/type";

export const metadata: Metadata = {
  title: "Blog",
};


const BlogPage = () => {

  return (
    <>
      <section className="bg-APP_ASH dark:bg-zinc-950 h-[250px] lg:h-[300px]">
        <MaxWidthContainer>
          {/* Admin bar */}
          <BlogAdminBar />
          {/* Banner */}
          <div className="w-full h-[300px] flex justify-between items-center mb-6 ">
            <div className="flex-[0.3] leading-tight hidden md:block mr-4">
              <p className={cn("main-heading text-7xl")}>
                OGSoft <br />
                Blog
              </p>
              <p className="main-desc">stay up to date!.</p>
            </div>

            <div className="flex-1 w-full h-[200px] lg:h-[300px] flex items-center justify-end relative">
              <Image
                src="/banner.png"
                fill
                alt="blog-logo"
                priority
                className="object-cover lg:object-contain object-center"
              />
            </div>
          </div>
        </MaxWidthContainer>
      </section>

      <MaxWidthContainer>
        {/* All POSTS */}
        <RenderBlogPost />
      </MaxWidthContainer>
    </>
  );
};

export default BlogPage;

async function RenderBlogPost() {
  const blogPost: PostType[] = await cachedPosts();

  return <PostShowCase blogPost={blogPost} />;
}
