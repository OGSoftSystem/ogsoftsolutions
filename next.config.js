/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export",
  images: {
    // loader: "imageLoader",
    // loaderFile: "./loader.ts",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "uploadthing.com",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
