import {
  useQuery as useReactQuery,
  UseQueryOptions as ReactQueryConfig,
  UseQueryResult as ReactQueryResult,
} from "react-query";
import {
  Protocol,
  ProtocolRespType,
  RequestParameters,
} from "src/query/protocol";
import { QueryDefinition } from "src/query/withQuery";

export function useQuery<
  P extends Protocol["query"],
  api extends keyof P,
  RespType extends ProtocolRespType<ReturnType<P[api]>>
>(
  queryDef: QueryDefinition<P, api>,
  reqBody: RequestParameters<P[api]>,
  config?: ReactQueryConfig<RespType>
): ReactQueryResult<RespType> {
  const { queryKey, queryFunction } = queryDef;

  const defaultQueryConfig = {
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
  };

  return useReactQuery<RespType>(
    [queryKey, reqBody],
    () => queryFunction(reqBody),
    Object.assign({}, defaultQueryConfig, config)
  );
}
