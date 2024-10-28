import React from "react";
import Iframe from "react-iframe";

const VideoPlayer = ({ url }: { url: string }) => {
  return (
    <>
      <Iframe
        url={url}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        // width="400"
        allowFullScreen
        // height="300"
        display="block"
        position="relative"
        className="w-full md:w-[500px] h-[350px]"
      />
    </>
  );
};

export default VideoPlayer;
