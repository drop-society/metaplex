import { gql } from "@apollo/client";

export const CREATE_COMPANY = gql`
  mutation CreateCompany(
    $name: String!
    $identifier: String!
    $emailSuffix: String!
  ) {
    createCompany(
      input: { name: $name, identifier: $identifier, emailSuffix: $emailSuffix }
    ) {
      ... on CreateCompanySuccess {
        companyID
        success
      }
      ... on CreateCompanyError {
        message
        success
      }
    }
  }
`;
