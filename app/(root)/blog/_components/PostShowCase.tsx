"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { PostType } from "@/type/type";
import { cn } from "@/lib/utils";
import PostThumbnail from "./PostThumbnail";

const PostShowCase = ({ blogPost }: { blogPost: PostType[] }) => {
  const [selectedCat, setSelectedCat] = useState("general");

  const livePost = blogPost.filter((post) => post.live);

  let filteredPost =
    selectedCat === "general"
      ? livePost
      : livePost.filter((post) => post.category === selectedCat);

  return (
    <div>
      <div className="w-full flex items-center justify-between my-6 md:mt-12">
        <p>Recent posts</p>

        <SelectComp value={selectedCat} selectedCat={setSelectedCat} />
      </div>

      {blogPost.length > 0 ? (
        <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 md:gap-8 mb-6">
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
  // onValueChange,
  selectedCat,
}: {
  value: string;
  // onValueChange: (v: string) => void;
  selectedCat: (v: string) => void;
}) => {
  const selectOptions = [
    { title: "General", value: "general" },
    { title: "Tech", value: "tech" },
    { title: "Business", value: "business" },
    { title: "Health", value: "health" },
  ];

  return (
    <div className="w-[40%]">
      <div className="md:hidden">
        <Select
          name="selected_cat"
          value={value}
          onValueChange={(value) => selectedCat(value)}
          defaultValue="general"
        >
          <SelectTrigger className="md:w-[180px]">
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
      </div>

      {/* Medium screen */}
      <div className="hidden md:flex justify-end">
        {selectOptions.map((opt) => {
          return (
            <div
              onClick={() => selectedCat(opt.value)}
              key={opt.value}
              className={cn(
                "w-full rounded-2xl flex items-center justify-center cursor-pointer hover:text-APP_BTN_BLUE",
                opt.value === value
                  ? "bg-APP_BTN_BLUE text-white py-1 ease-in duration-100"
                  : null
              )}
            >
              <span>{opt.title}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export function PostSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="flex flex-col items-center mt-12 mb-6 ">
        <div className=" w-full bg-gray-100 h-20" />
        <div className=" w-full bg-gray-200 h-6" />
      </div>

      <div className="flex-1 w-full h-20 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 md:gap-8 mb-6 bg-gray-300" />
    </div>
  );
}
