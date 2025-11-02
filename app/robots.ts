import { MetadataRoute } from "next";

export default function Robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "",
      },
    ],
    sitemap: "https://kisisel-portfoy.vercel.app/sitemap.xml",
  };
}
