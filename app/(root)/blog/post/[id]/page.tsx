import MaxWidthContainer from "@/components/MaxWidthContainer";
import AuthorProfile from "@/components/atom/AuthorProfile";
import BlogAdminBar from "@/components/atom/BlogAdminBar";
import CommentForm from "@/components/atom/CommentForm";
import ExpressButtons from "@/components/atom/ExpressButtons";
import SingleComment from "@/components/atom/SingleComment";
import SkeletonComp from "@/components/atom/SkeletonComp";
import { buttonVariants } from "@/components/ui/button";
import {
  fetchPosts,
  findCommentsByPostId,
  findPostById,
  getRelatedPosts,
} from "@/lib/actions/post.action";
import { cn } from "@/lib/utils";
import { CommentType, PostType } from "@/type/type";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { Suspense, cache } from "react";
import parse from "html-react-parser";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type ParamsType = {
  params: { id: string };
};

const getPostById = cache(async (id: string): Promise<PostType> => {
  return await findPostById(id);
});

// Dynamic metadata
export async function generateMetadata({
  params: { id },
}: ParamsType): Promise<Metadata> {
  const post: PostType = await getPostById(id);

  return {
    title: post.title,
    description: post.subTitle,
    openGraph: {
      images: [{ url: post.photo }],
    },
  };
}

// Fetches data at compile time and serves static html (prerender)
export const generateStaticParams = async () => {
  const posts: PostType[] = await fetchPosts();

  return posts.map((post) => ({ id: post._id }));
};

const PostPage = async ({ params }: ParamsType) => {
  if (!/^[0-9a-fA-F]{24}$/.test(params.id)) {
    return notFound(); // ID is not in the correct format
  }

  const post: PostType = await getPostById(params.id);

  const authorsPost: PostType[] = await fetchPosts();

  const comments: CommentType[] = await findCommentsByPostId(params.id);

  const author = authorsPost.find((p) => p.author)?.author;

  const relatedPosts = await getRelatedPosts(author!);

  return (
    <MaxWidthContainer>
      <BlogAdminBar />
      <div className="w-full min-h-[calc(100vh-10vh)]">
        <div className="w-full h-[300px] lg:h-[500px] relative mb-6">
          <Image
            src={post!.photo}
            fill
            alt="post-image"
            priority
            className="object-fill object-center w-full h-auto" 
          />
        </div>
        <p className="poppins uppercase font-semibold text-gray-700 dark:text-gray-200">
          {post!.title}
        </p>
        <p className="p-text text-gray-700 dark:text-gray-500">
          {post!.subTitle}
        </p>
        <div className="flex items-center space-x-2">
          <p className={cn("poppins text-[12px] font-light text-gray-500")}>
            {post!.author}
          </p>
          <p className="text-[12px] font-light text-gray-400">|</p>
          <p className={cn("poppins text-[12px] font-light text-gray-400")}>
            {moment(post!.date.toString(), "YYYYMMDD").fromNow()}
          </p>
        </div>
        <div className="md:flex flex-1 w-full">
          {/* Post body */}
          <div className="md:flex-1 py-4">
            <div className="pr-2 dark:text-gray-300 lg:text-justify">
              {parse(post!.body)}
            </div>

            {/* category badge */}
            <p className="my-2 px-2 py-1 rounded-2xl bg-gray-200  text-gray-700 dark:bg-zinc-800 dark:text-gray-500 w-fit text-[12px]">
              {post!.category}
            </p>

            {/* Like disLike Comment */}
            <div className="flex items-center space-x-2 w-full my-4">
              <ExpressButtons
                likes={post.likes}
                disLikes={post.disLikes}
                comments={post.comments.length}
                title={post!.title}
              />
            </div>

            {/* Comment Form */}
            <div className="py-4 pr-4">
              <CommentForm postId={params.id} />
            </div>

            {/* Other comments*/}
            <div>
              {comments.map((comment: CommentType) => {
                const id = comment.id.toString();

                return <SingleComment key={id} id={id} text={comment.text} />;
              })}
            </div>
          </div>

          {/* Author's profile  Right*/}
          <div className="hidden md:flex md:flex-col items-center border-l md:flex-[0.3] flex-col px-4 py-6 sticky top-[200px]">
            <Suspense fallback={<SkeletonComp />}>
              <AuthorProfile singlePost={post} />
            </Suspense>

            <div className="my-6 w-full">
              {/* Replated post links */}
              <p className="poppins text-gray-700 dark:text-gray-400">
                Other Posts from this author:
              </p>

              <div className="flex flex-col">
                {relatedPosts.map((p: any) => {
                  const id = p._id.toString();
                  return (
                    <Link
                      href={`/blog/post/${id}`}
                      key={p.title}
                      className={cn(
                        "text-sm leading-[0.5] capitalize text-left ",
                        buttonVariants({ variant: "link" })
                      )}
                    >
                      <p className="leading-tight line-clamp-1">{p.title}</p>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MaxWidthContainer>
  );
};

export default PostPage;
