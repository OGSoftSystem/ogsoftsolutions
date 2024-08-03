"use client";


export default function imageLoader({ src, width, quality }: any) {
  if (src.startsWith("https://utfs.io")) return src;
  return `https://ogsoftsolutions.com/${src}?w=${width}&q=${quality || 75}`;
}

