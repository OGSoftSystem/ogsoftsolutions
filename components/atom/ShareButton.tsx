import { cn } from "@/lib/utils";
import {
  FacebookIcon,
  FacebookShareButton,
  FacebookShareCount,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterShareButton,
  XIcon,
} from "react-share";

export function ShareButton({ className, title}: { className?: string, title: string }) {


  return (
    <div className={cn("hidden ml-3", className)}>
        <FacebookShareButton
          url="https://facebook.com/"
        >
          <FacebookIcon size={25} round />
        </FacebookShareButton>

        <TwitterShareButton
          url="https://twitter.com/"
          title={title}
        >
          <XIcon size={25} round />
        </TwitterShareButton>

        <LinkedinShareButton
          url="https://www.linkedin.com/"
        >
          <LinkedinIcon size={25} round />
        </LinkedinShareButton>

    </div>
  );
}
