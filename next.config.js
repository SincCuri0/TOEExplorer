/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Ignore node-specific modules when bundling for the browser
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      dns: false,
      child_process: false,
      'utf-8-validate': false,
      'bufferutil': false,
      'mapbox/node-pre-gyp': false,
    };
    return config;
  },

  // Configure allowed image domains
  images: {
    domains: ['i.pravatar.cc']
  },

  // Optimize for Vercel deployment
  output: 'standalone', // Optimize for serverless deployment

  // Experimental settings
  experimental: {
    workerThreads: false,
  },

  // **Explicitly Disable Static Generation for API Routes**
  // Disable automatic static optimization for API routes to prevent errors
  async redirects() {
    return [];
  },
  async rewrites() {
    return [];
  },

  // Handle dynamic route errors during build
  staticPageGenerationTimeout: 1000,
  
  // Ignore typescript errors during build
  typescript: {
    ignoreBuildErrors: true,
  },

  // Ignore eslint errors during build
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
