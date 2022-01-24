
module.exports = {
  client: {
    includes: ['./gql/**/*.ts'],
    service: {
      name: "token-tix",
      url: "http://localhost:8080/query",
      skipSSLValidation: true
    }
  }
};
