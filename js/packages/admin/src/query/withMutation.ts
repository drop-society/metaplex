import { Protocol } from "src/query/protocol";

export type MutationDefinition<
  P extends Protocol["mutation"],
  api extends keyof P
> = {
  mutationKey: api;
  mutationFunction: P[api];
};

type withMutationReturnType<T extends Protocol["mutation"]> = {
  [api in keyof T]: MutationDefinition<T, api>;
};

export default function withMutation<T extends Protocol["mutation"]>(
  mutations: T
): withMutationReturnType<T> {
  let mutation: withMutationReturnType<T> = Object.assign({});
  for (const api in mutations) {
    const fn = mutations[api];
    const apiKey = api;

    mutation = Object.assign(mutation, {
      [apiKey]: {
        mutationKey: apiKey,
        mutationFunction: fn,
      },
    });
  }
  return mutation;
}
