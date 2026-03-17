import { withPayload } from '@payloadcms/next/withPayload'

const toRemotePattern = (rawUrl) => {
  if (!rawUrl) return null

  try {
    const parsed = new URL(rawUrl)
    return {
      protocol: parsed.protocol.replace(':', ''),
      hostname: parsed.hostname,
      port: parsed.port || '',
      pathname: '/**',
    }
  } catch {
    return null
  }
}

const configuredRemotePatterns = Array.from(
  new Map(
    [process.env.S3_ENDPOINT, process.env.NEXT_PUBLIC_MEDIA_URL]
      .map(toRemotePattern)
      .filter(Boolean)
      .map((pattern) => [`${pattern.protocol}://${pattern.hostname}:${pattern.port}`, pattern]),
  ).values(),
)

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: configuredRemotePatterns,
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
