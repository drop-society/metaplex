
module.exports = {
  client: {
    includes: ['./src/gql/**/*.ts'],
    service: {
      name: "token-tix",
      url: "http://localhost:8080/query",
      skipSSLValidation: true
    }
  }
};
