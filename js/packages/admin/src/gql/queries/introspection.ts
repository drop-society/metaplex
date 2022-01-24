import { gql } from "@apollo/client";

export const TYPE_REF = gql`
  fragment TypeRef on __Type {
    kind
    name
    ofType {
      kind
      name
      ofType {
        kind
        name
        ofType {
          kind
          name
          ofType {
            kind
            name
            ofType {
              kind
              name
              ofType {
                kind
                name
                ofType {
                  kind
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const INPUT_VALUE = gql`
  ${TYPE_REF}

  fragment InputValue on __InputValue {
    name
    description
    type {
      ...TypeRef
    }
    defaultValue
  }
`;

export const FULL_TYPE = gql`
  ${INPUT_VALUE}
  ${TYPE_REF}

  fragment FullType on __Type {
    kind
    name
    description
    fields(includeDeprecated: true) {
      name
      description
      args {
        ...InputValue
      }
      type {
        ...TypeRef
      }
      isDeprecated
      deprecationReason
    }
    inputFields {
      ...InputValue
    }
    interfaces {
      ...TypeRef
    }
    enumValues(includeDeprecated: true) {
      name
      description
      isDeprecated
      deprecationReason
    }
    possibleTypes {
      ...TypeRef
    }
  }
`;

export const GET_SCHEMA = gql`
  ${INPUT_VALUE}
  ${FULL_TYPE}

  query IntrospectionQuery {
    __schema {
      queryType {
        name
      }
      mutationType {
        name
      }
      subscriptionType {
        name
      }
      types {
        ...FullType
      }
      directives {
        name
        description
        locations
        args {
          ...InputValue
        }
      }
    }
  }
`;

export const QUERY_TYPE = "Query";
export const GET_QUERY_TYPES = gql`
  ${FULL_TYPE}

  query GetType($type: String!) {
    __type(name: $type) {
      ...FullType
    }
  }
`;
