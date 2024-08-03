import MaxWidthContainer from "@/components/MaxWidthContainer";
import PostForm from "@/app/(root)/dashboard/post/_components/PostForm";
import { findPostById } from "@/lib/actions/post.action";
import { PostType } from "@/type/type";
import { Metadata } from "next";
import PageHeadingText from "@/components/shared/PageHeadingText";

export const metadata: Metadata = {
  title: "Edit Post",
};

const PostEditPage = async ({ params: { id } }: { params: { id: string } }) => {
  const post: PostType = await findPostById(id);

  return (
    <MaxWidthContainer className="paddingY">
      <PageHeadingText title="Edit Post" description="Edit A Post" />

      <div className="w-full flex justify-center">
        <PostForm post={post} type="Update" />
      </div>
    </MaxWidthContainer>
  );
};

export default PostEditPage;
