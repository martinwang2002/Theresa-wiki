module.exports = {
  images: {
    domains: ["s3-torappu.martinwang2002.com"],
  },
  poweredByHeader: false,
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
  }
}
