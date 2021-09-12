module.exports = {
  async rewrites () {
    return [
      {
        source: '/:server(CN|US|JP|TW|KR)/:path*',
        destination: '/:path*?server=:server'
      }
    ]
  }
}
