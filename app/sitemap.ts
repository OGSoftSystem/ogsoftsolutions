import { fetchPosts } from "@/lib/actions/post.action";
import { PostType } from "@/type/type";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts: PostType[] = await fetchPosts();

  const postEntries: MetadataRoute.Sitemap = posts.map(({ _id }) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog/post/${_id}`,
  }));
  return [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/about`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/services`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/faq`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing`,
    },
    ...postEntries,
  ];
}
