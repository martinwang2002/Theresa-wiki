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
    domains: [process.env.THERESA_STATIC],
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
    THERESA_STATIC: {
      scheme: process.env.NODE_ENV === "production" ? "https" : "http",
      host: process.env.THERESA_STATIC ?? ""
    }
  },
  serverRuntimeConfig: {
    THERESA_S3: {
      scheme:  "http",
      host: process.env.THERESA_S3 ?? ""
    }
  },
}
