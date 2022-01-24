import { Protocol } from "src/query/protocol";

const mockAPI: Protocol = {
  query: {
    getSchema: () => Promise.reject(() => new Error()),
  },
  mutation: {},
};

export default mockAPI;
