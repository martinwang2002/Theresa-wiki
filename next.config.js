let commitHash, gitBranch

try {
  commitHash = require("child_process")
    .execSync("git rev-parse --short HEAD")
    .toString().trim() || "unknown"
  gitBranch = require("child_process")
    .execSync("git branch --show-current")
    .toString().trim()
} catch (e) {
  commitHash = "unknown"
  gitBranch = "unknown"
}

let versionString

try {
  const YAML = require("yaml")
  const fs = require("fs")
  const changelog = YAML.parse(fs.readFileSync("./changelog.yaml", "utf8"))

  const version = changelog.versions[0].version
  versionString = version.join(".")

  if (gitBranch !== "master") {
    versionString += `+${gitBranch}`
  }
} catch (e) {
  versionString = "unknown"
}

const uriJs = require("uri-js")

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
    THERESA_STATIC: uriJs.parse(process.env.THERESA_STATIC ?? "https://static.theresa.wiki"),
    CRISP_WEBSITE_ID: process.env.CRISP_WEBSITE_ID,
  },
  serverRuntimeConfig: {
    NO_DYNAMIC_ROUTES: process.env.NODE_ENV === "development" || process.env.THERESA_WIKI_NO_BUILD_DYNAMIC_ROUTES?.toLowerCase() === "true",
    REDIS_URL: process.env.REDIS_URL ?? "",
    THERESA_S3: uriJs.parse(process.env.THERESA_S3 ?? "http://s3.theresa.wiki"),
  },
}
