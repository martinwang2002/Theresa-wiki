let commitHash

try {
  commitHash = require("child_process")
    .execSync("git rev-parse --short HEAD")
    .toString().trim() || "unknown"
} catch (e) {
  commitHash = "unknown"
}

let versionString

try {
  const YAML = require("yaml")
  const fs = require("fs")
  const changelog = YAML.parse(fs.readFileSync("./changelog.yaml", "utf8"))

  const version = changelog.versions[0].version
  versionString = version.join(".")
} catch (e) {
  versionString = "unknown"
}


module.exports = {
  images: {
    deviceSizes: [640, 750, 828, 1080],
    domains: [process.env.THERESA_STATIC || "static.theresa.wiki"],
    imageSizes: [128, 256, 384],
  },
  poweredByHeader: false,
  reactStrictMode: true,
  experimental: {
    outputStandalone: true,
  },
  async rewrites() {
    return [
      {
        source: "/:server(CN|US|JP|TW|KR)/:path*",
        destination: "/:path*?server=:server"
      }
    ]
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push({
      test: /\.md$/i,
      loader: "raw-loader",
    })
    config.module.rules.push({
      test: /\.ya?ml$/,
      type: "json",
      use: "yaml-loader"
    })
    return config
  },
  publicRuntimeConfig: {
    THERESA_WIKI_VERSION: versionString,
    GIT_COMMIT: commitHash,
    GTAG_ID: process.env.GTAG_ID,
    THERESA_STATIC: {
      scheme: process.env.THERESA_STATIC !== "static.theresa.localhost" ? "https" : "http",
      host: process.env.THERESA_STATIC ?? ""
    }
  },
  serverRuntimeConfig: {
    NO_DYNAMIC_ROUTES: process.env.NODE_ENV === "development" || process.env.THERESA_WIKI_NO_BUILD_DYNAMIC_ROUTES?.toLowerCase() === "true",
    REDIS_URL: process.env.REDIS_URL ?? "",
    THERESA_S3: {
      scheme: "http",
      host: process.env.THERESA_S3 ?? ""
    }
  },
}
