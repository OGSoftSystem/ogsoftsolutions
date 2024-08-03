"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import PostThumbnail from "../PostThumbnail";
import { PostType } from "@/type/type";

const PostShowCase = ({ blogPost }: { blogPost: PostType[] }) => {
  const [selectedCat, setSelectedCat] = useState("general");

  const livePost = blogPost.filter(post => post.live);

  let filteredPost =
    selectedCat === "general"
      ? livePost
      : livePost.filter((post) => post.category === selectedCat);

  return (
    <div>
      <div className="flex items-center justify-between mt-12 mb-6">
        <p>Recent posts</p>
        <SelectComp
          value={selectedCat}
          onValueChange={(v) => setSelectedCat(v)}
        />
      </div>

      {blogPost.length >  0 ? (
        <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 md:gap-8 mb-6">
          {filteredPost.map((post: any) => {
            return (
              <PostThumbnail
                key={post.title}
                _id={post._id}
                author={post.author}
                photo={post.photo}
                title={post.title}
                date={post.date.toString()}
                category={post.category}
              />
            );
          })}
        </div>
      ) : (
        <div className="h-[calc(100vh-60vh)] xl:h-auto flex items-center justify-center">
          <p className="p-text">No post to show.</p>
        </div>
      )}
    </div>
  );
};

export default PostShowCase;

const SelectComp = ({
  value,
  onValueChange,
}: {
  value: string;
  onValueChange: (v: string) => void;
}) => {
  const selectOptions = [
    { title: "General", value: "general" },
    { title: "Tech", value: "tech" },
    { title: "Business", value: "business" },
    { title: "Health", value: "health" },
  ];
  return (
    <Select
      name="selected_cat"
      value={value}
      onValueChange={onValueChange}
      defaultValue="general"
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Category" />
      </SelectTrigger>

      <SelectContent>
        {selectOptions.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export function PostSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="flex items-center justify-between mt-12 mb-6 ">
        <div className=" w-full bg-gray-300" />
        <div className=" w-full bg-gray-300" />
      </div>

      <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 md:gap-8 mb-6">
        <div className="w-full h-full" />
      </div>
    </div>
  );
}
