export default {
  async rewrites() {
    console.log("rewritting url")
    return [
      {
        source: '/graphql/query',
        destination: 'http://localhost:8080/query',
      },
    ]
  },
}