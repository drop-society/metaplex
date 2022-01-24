import {
  useMutation as useReactMutation,
  UseMutationOptions as ReactMutationConfig,
  UseMutationResult as ReactMutationResult,
} from "react-query";
import {
  Protocol,
  ProtocolRespType,
  RequestParameters,
} from "src/query/protocol";
import { AxiosResponse } from "axios";
import { MutationDefinition } from "src/query/withMutation";

export default function useMutation<
  P extends Protocol["mutation"],
  api extends keyof P,
  RespType extends ProtocolRespType<ReturnType<P[api]>>,
  ArgsType extends RequestParameters<P[api]>
>(
  mutationDef: MutationDefinition<P, api>,
  config?: ReactMutationConfig<RespType, AxiosResponse, ArgsType>
): ReactMutationResult<RespType, AxiosResponse, ArgsType> {
  const { mutationKey, mutationFunction } = mutationDef;

  return useReactMutation<RespType, AxiosResponse, ArgsType>(
    [mutationKey],
    mutationFunction,
    Object.assign({}, config)
  );
}
