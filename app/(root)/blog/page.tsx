import MaxWidthContainer from "@/components/MaxWidthContainer";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { cachedPosts } from "@/lib/cache";
import BlogAdminBar from "@/components/atom/BlogAdminBar";
import { Metadata } from "next";
import { PostType } from "@/type/type";
import PostShowCase, { PostSkeleton } from "./_components/PostShowCase";
import React, { Suspense } from "react";
import { fetchPosts } from "@/lib/actions/post.action";

export const metadata: Metadata = {
  title: "Blog",
};

const BlogPage = () => {
  return (
    <>
      <section className="bg-APP_ASH dark:bg-zinc-950 md:h-[250px] lg:h-[300px]">
        <MaxWidthContainer>
          {/* Admin bar */}
          <BlogAdminBar />
          {/* Banner */}

          <div className="w-full md:h-[300px] flex justify-between items-center mb-6">
            <div className="flex-[0.3] leading-tight hidden md:block mr-4">
              <p className={cn("main-heading lg:text-6xl")}>
                OGSoft <br />
                Blog
              </p>
              <p className="main-desc">stay up to date!.</p>
            </div>

            <div className="flex-1 w-full h-[150px] lg:h-[300px] flex items-center justify-end relative">
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
        <Suspense
          fallback={
            <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 md:gap-8 mb-6">
              <PostSkeleton />
              <PostSkeleton />
              <PostSkeleton />
              <PostSkeleton />
            </div>
          }
        >
          <RenderBlogPost />
        </Suspense>
      </MaxWidthContainer>
    </>
  );
};

export default BlogPage;

async function RenderBlogPost() {
  const blogPost: PostType[] = await fetchPosts();

  return <PostShowCase blogPost={blogPost} />;
}
