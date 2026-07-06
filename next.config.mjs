/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
   images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "ugiibwvynhixlceaknll.supabase.co",
      },
    ],
  },
  allowedDevOrigins: ['172.19.218.5'],
};

export default nextConfig;
