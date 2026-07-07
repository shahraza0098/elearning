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
  allowedDevOrigins: ['172.19.218.5','172.19.218.6', 'http://172.23.160.1:3000' , 'http://10.185.136.5','https://www.gyanmaster.com/'],
};

export default nextConfig;
