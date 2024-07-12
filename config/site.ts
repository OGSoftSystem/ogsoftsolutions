export const siteConfig = {
  name: "Ogsoft Solutions",
  defaultDescription: "Ogsoft Solutions. HMS at it's best.",
  description:
    "We are an integrated IT Software Company providing comprehensive end-to-end B2B software solutions to the entire healthcare industry.",
  baseUrl:
    process.env.NODE_ENV === "production"
      ? (process.env.NEXT_PUBLIC_BASE_URL as string)
      : "http://localhost:3000",
  keywords: [
    "Megatron",
    "HMS",
    "Health",
    "Hospital",
    "Management System",
    "Wellness",
    "Solution",
  ],
};

export type SiteConfig = typeof siteConfig;
