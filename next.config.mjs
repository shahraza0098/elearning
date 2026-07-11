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
  allowedDevOrigins: ['172.27.144.1','10.199.235.5','10.93.243.5','172.30.128.1','172.19.218.5','172.20.10.3','https://www.gyanmaster.com/'],
};

export default nextConfig;
