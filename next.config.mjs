/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["firebasestorage.googleapis.com"],
        remotePatterns: [{hostname: "utfs.io"}]
    },
};
export default nextConfig;
