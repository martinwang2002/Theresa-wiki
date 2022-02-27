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
    domains: [process.env.THERESA_STATIC || "static.theresa.wiki"],
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
    THERESA_STATIC: {
      scheme: process.env.THERESA_STATIC !== "static.theresa.localhost" ? "https" : "http",
      host: process.env.THERESA_STATIC ?? ""
    }
  },
  serverRuntimeConfig: {
    REDIS_URL: process.env.REDIS_URL ?? "",
    THERESA_S3: {
      scheme: "http",
      host: process.env.THERESA_S3 ?? ""
    }
  },
}
