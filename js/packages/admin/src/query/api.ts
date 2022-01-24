import { Protocol } from "src/query/protocol";
import withQuery from "src/query/withQuery";
import withMutation from "src/query/withMutation";
import mockAPI from "src/query/mockAPI";
import { getSchema } from "src/query/gql/query";

const infrAPI: Protocol = {
  query: {
    getSchema: getSchema,
  },
  mutation: {},
};

const useMockAPI =
  process.env.REACT_APP_OFFLINE || process.env.REACT_APP_TESTING;

export const queries = withQuery(useMockAPI ? mockAPI.query : infrAPI.query);
export const mutations = withMutation(
  useMockAPI ? mockAPI.mutation : infrAPI.mutation
);
