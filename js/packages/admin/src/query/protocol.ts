import { GetSchema } from "src/query/gql/query";

export type ProtocolRespType<T> = T extends Promise<infer U> ? U : T;

/* eslint-disable  @typescript-eslint/no-explicit-any */
export type RequestParameters<T extends (reqBody: any) => any> = T extends (
  reqBody: infer P
) => any
  ? P
  : never;

export interface Protocol {
  query: {
    [key: string]: (reqBody: any) => Promise<any>;
    getSchema: GetSchema;
  };
  mutation: {
    [key: string]: (reqBody: any) => Promise<any>;
  };
}
