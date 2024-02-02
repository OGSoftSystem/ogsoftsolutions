import MaxWidthContainer from "@/components/MaxWidthContainer";
import PostForm from "@/components/atom/PostForm";
import { fetchPosts, findPostById } from "@/lib/actions/post.action";
import { PostType } from "@/type/type";
import { Metadata } from "next";
import { cache } from "react";

type ParamsType = {
  params: { id: string };
};

const getPostById = cache(async (id: string): Promise<PostType> => {
  return await findPostById(id);
});

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

export const generateStaticParams = async () => {
  const posts: PostType[] = await fetchPosts();

  return posts.map((post) => ({ id: post._id }));
};

const PostEditPage = async ({ params: { id } }: ParamsType) => {
  const post = await findPostById(id);

  return (
    <MaxWidthContainer className="paddingY">
      <div className="w-full sm:w-9/12 md:w-7/12 lg:w-6/12 mx-auto flex flex-col space-y-2">
        <PostForm post={post} type="Update" />
      </div>
    </MaxWidthContainer>
  );
};

export default PostEditPage;
