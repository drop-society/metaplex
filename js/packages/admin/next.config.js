module.exports = {
  swcMinify: true,
  async rewrites() {
    console.log("rewritting url")
    return [
      {
        source: '/query',
        destination: 'http://localhost:8080/query',
      },
    ]
  },
}