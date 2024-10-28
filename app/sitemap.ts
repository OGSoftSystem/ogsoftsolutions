import { siteConfig } from "@/config/site";
import { fetchPosts } from "@/lib/actions/post.action";
import { PostType } from "@/type/type";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts: PostType[] = await fetchPosts();

  const postEntries: MetadataRoute.Sitemap = posts.map(({ _id }) => ({
    url: `${siteConfig.baseUrl}/blog/post/${_id}`,
  }));
  return [
    {
      url: `${siteConfig.baseUrl}`,
    },
    {
      url: `${siteConfig.baseUrl}/about`,
    },
    {
      url: `${siteConfig.baseUrl}/services`,
    },
    {
      url: `${siteConfig.baseUrl}/faq`,
    },
    {
      url: `${siteConfig.baseUrl}/contact-us`,
    },
    {
      url: `${siteConfig.baseUrl}/pricing`,
    },
    ...postEntries,
  ];
}
