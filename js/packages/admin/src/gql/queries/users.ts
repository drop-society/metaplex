import { gql } from '@apollo/client';
import { gql as gqlc } from 'graphql-tag';

export const TOKEN = 'token';

export const CREATE_USER = gql`
  mutation CreateUser(
    $email: String!
    $password: String!
    $displayName: String!
    $firstName: String!
    $lastName: String!
    $role: Role!
  ) {
    createUser(
      input: {
        email: $email
        password: $password
        displayName: $displayName
        firstName: $firstName
        lastName: $lastName
        role: $role
      }
    ) {
      ... on CreateUserSuccess {
        success
        userID
      }
      ... on CreateUserError {
        success
        message
      }
    }
  }
`;

export const LOGIN_ADMIN_USER = gql`
  mutation loginAdminUser($email: String!, $password: String!) {
    loginAdminUser(input: { email: $email, password: $password }) {
      ... on LoginUserSuccess {
        success
        token
      }
      ... on LoginUserFailed {
        success
        message
      }
    }
  }
`;

export const GET_ADMIN_USER = gql`
  query GetAdminUser {
    getAdminUser {
      ... on GetUserSuccess {
        user {
          id
          email
          firstName
          lastName
          displayName
          teams {
            name
            description
            name
            identifier
            company {
              name
              identifier
            }
          }
        }
      }
      ... on GetUserError {
        message
        success
      }
    }
  }
`;

export const GET_AUTH_TOKEN = gqlc`
  query GetToken {
    token @client(always: true)
  }
`;

export const IS_LOGGED_IN = gqlc`
  query IsUserLoggedIn {
    isLoggedIn @client(always: true)
  }
`;
export const SET_TOKEN = gqlc`
  mutation SetToken($token: String!) {
    setToken(token: $token) @client(always: true)
  }
`;

export const LOG_OUT = gqlc`
  mutation SetToken($token: String!) {
    logOut @client(always: true)
  }
`;
