import { gql } from "@apollo/client";

export const CREATE_TEAM = gql`
  mutation CreateTeam(
    $name: String!
    $description: String!
    $identifier: String!
    $companyID: ID!
  ) {
    createTeam(
      input: {
        name: $name
        identifier: $identifier
        description: $description
        companyID: $companyID
      }
    ) {
      ... on CreateTeamSuccess {
        teamID
        success
      }
      ... on CreateTeamError {
        message
        success
      }
    }
  }
`;
