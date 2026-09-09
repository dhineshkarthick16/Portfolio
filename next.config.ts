import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/resume",
        destination:
          "https://docs.google.com/document/d/1dd_YqEEEp1pCjDiv7RP6-Oki0diKR0X8VCa4Ra3dPEM/export?format=pdf",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
