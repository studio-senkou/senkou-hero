import type { NextConfig } from 'next'

const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseS3 = process.env.NEXT_PUBLIC_SUPABASE_S3

function ensureWildcardPattern(pathname: string): string {
  if (pathname.endsWith('/**')) return pathname
  if (pathname.endsWith('/*')) return pathname.slice(0, -1) + '**'
  if (pathname.endsWith('/')) return pathname + '**'
  return pathname + '/**'
}

// prettier-ignore
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [      {
        protocol: 'https',
        hostname: 'cdn.dummyjson.com',
        pathname: ensureWildcardPattern('/product-images/'),
      },
      {
        protocol: 'https',
        hostname: 'placehold.in',
        pathname: ensureWildcardPattern('/'),
      },
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
        pathname: ensureWildcardPattern('/api/'),
      },
      {
        protocol: 'https',
        hostname: supabaseURL?.replace('https://', '') || '',
        pathname: ensureWildcardPattern(
          new URL(supabaseS3!).pathname ?? '/storage/v1/object/public/',
        ),
      },
    ],
  },
}

export default nextConfig
