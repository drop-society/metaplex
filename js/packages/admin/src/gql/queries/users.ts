import { gql } from "@apollo/client";
import { gql as gqlc } from "graphql-tag";

export const TOKEN = "token";

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

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(input: { email: $email, password: $password }) {
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

export const GET_USER = gql`
  query GetUser {
    getUser {
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
