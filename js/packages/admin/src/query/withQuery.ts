import { Protocol, RequestParameters } from "src/query/protocol";

export type QueryDefinition<
  P extends Protocol["query"],
  api extends keyof P
> = {
  queryKey: keyof P;
  queryFunction: (reqBody: RequestParameters<P[api]>) => ReturnType<P[api]>;
};

type withQueryReturnType<T extends Protocol["query"]> = {
  [api in keyof T]: QueryDefinition<T, api>;
};

export default function withQuery<T extends Protocol["query"]>(
  queries: T
): withQueryReturnType<T> {
  let query: withQueryReturnType<T> = Object.assign({});
  for (const api in queries) {
    const fn = queries[api];
    const apiKey = api;

    query = Object.assign(query, {
      [apiKey]: {
        queryKey: apiKey,
        queryFunction: fn,
      },
    });
  }
  return query;
}
