import MaxWidthContainer from "@/components/MaxWidthContainer";
import Image from "next/image";
import { cn } from "@/lib/utils";
import BlogAdminBar from "@/components/atom/BlogAdminBar";
import { fetchPosts } from "@/lib/actions/post.action";
import PostShowCase from "@/components/atom/PostShowCase";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
};

const BlogPage = async () => {
  const blogPost = await fetchPosts();

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
                className="object-cover lg:object-contain object-center"
              />
            </div>
          </div>
        </MaxWidthContainer>
      </section>

      <MaxWidthContainer>
        {/* All POSTS */}
        <PostShowCase blogPost={blogPost} />
      </MaxWidthContainer>
    </>
  );
};

export default BlogPage;
