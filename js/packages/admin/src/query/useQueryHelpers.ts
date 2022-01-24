import { useQueryClient as useReactQueryClient } from "react-query";
import { Protocol, RequestParameters } from "src/query/protocol";
import { QueryDefinition } from "src/query/withQuery";

export default function useQueryHelpers<
  P extends Protocol["query"],
  api extends keyof P
>(): {
  invalidateQuery: (
    queryDef: QueryDefinition<P, api>,
    reqBody?: RequestParameters<P[api]>
  ) => void;
} {
  const queryClient = useReactQueryClient();

  const invalidateQuery = (
    queryDef: QueryDefinition<P, api>,
    reqBody?: RequestParameters<P[api]>
  ): void => {
    const { queryKey } = queryDef;
    queryClient.invalidateQueries(reqBody ? [queryKey, reqBody] : [queryKey]);
  };

  return {
    invalidateQuery,
  };
}
