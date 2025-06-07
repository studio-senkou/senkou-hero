import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL('https://cdn.dummyjson.com/product-images/**'),
      new URL('https://placehold.in/**'),
      new URL(`${process.env.NEXT_PUBLIC_SUPABASE_S3}/**`!),
    ],
  },
}

export default nextConfig
