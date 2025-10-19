/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/socket_io/:path*',
        destination: '/api/socket',
      },
    ]
  },
}

export default nextConfig
