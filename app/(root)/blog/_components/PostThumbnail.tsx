"use client";

import { cn, sliceText } from "@/lib/utils";
import { PostType } from "@/type/type";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import EditTab from "@/components/atom/EditTab";
import { useSession } from "next-auth/react";

/**
 * This component displays a post thumbnail
 */
const PostThumbnail = ({
  _id,
  author,
  photo,
  date,
  title,
  category,
}: Pick<
  PostType,
  "_id" | "photo" | "author" | "photo" | "date" | "title" | "category"
>) => {
  const { data: session } = useSession();

  const canEdit = session?.user.name === author;
  console.log(session);

  return (
    <div className="w-full sm:w-[200px] md:w-[280px] lg:w-[320px] p-4 group relative">
      <div className="w-full h-32 relative mb-6">
        <Image src={photo} fill alt="post-image" className="md:object-cover" />
      </div>

      <div className="flex items-center space-x-2">
        <p className={cn("font-poppins-regular text-[12px] font-light text-gray-400")}>
          {sliceText(author, 16)}
        </p>
        <p className="text-[12px] font-light text-gray-400">|</p>
        <p className={cn("font-poppins-regular text-[12px] text-gray-400")}>
          {moment(date.toString(), "YYYYMMDD").fromNow()}
        </p>
      </div>

      <p className="font-poppins-mid uppercase leading-tight text-gray-700 min-h-[50px] dark:text-gray-500">
        {sliceText(title, 55)}
      </p>

      <div className="flex items-center justify-between ">
        <p className="text-base font-nunito-300 text-muted-foreground">{category}</p>
        <Link
          href={`/blog/post/${_id}`}
          className={cn(
            "font-nunito-300 text-base leading-tight text-gray-500 cursor-pointer group-hover:text-blue-800 z-10"
          )}
        >
          read &rarr;
        </Link>
      </div>
      {/* Overlay */}
      <div className="group-hover:absolute group-hover:inset-0 group-hover:bg-APP_RGBA_BG transition-all duration-300 ease-in rounded-md" />

      {canEdit && (
        <div className="absolute top-16 right-2">
          <EditTab href={`/dashboard/post/${_id}/edit`} />
        </div>
      )}
    </div>
  );
};

export default PostThumbnail;
