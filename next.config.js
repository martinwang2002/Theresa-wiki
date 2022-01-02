let commitHash

try {
  commitHash = require('child_process')
    .execSync('git rev-parse --short HEAD')
    .toString().trim() || 'unknown'
} catch (e) {
  commitHash = 'unknown'
}

module.exports = {
  images: {
    domains: ["s3-torappu.martinwang2002.com"],
  },
  poweredByHeader: false,
  reactStrictMode: true,
  async rewrites () {
    return [
      {
        source: '/:server(CN|US|JP|TW|KR)/:path*',
        destination: '/:path*?server=:server'
      }
    ]
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push({
      test: /\.md$/i,
      loader: "raw-loader",
    });
    return config;
  },
  publicRuntimeConfig: {
    THERESA_WIKI_VERSION: process.env.npm_package_version || "unknown",
    GIT_COMMIT: commitHash,
  },
}
