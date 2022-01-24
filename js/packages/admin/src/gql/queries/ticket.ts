import { gql } from "@apollo/client";
import { gql as gqlc } from "graphql-tag";

export const CREATE_TICKET = gql`
  mutation CreateTicket($createTicketInput: CreateTicket!) {
    createTicket(input: $createTicketInput) {
      ... on CreateTicketSuccess {
        success
        ticketID
        ticket {
          id
          row
          eventID
          number
          type
          purchased
          updatedAt
          createdAt
        }
      }
    }
  }
`;

export const HOLD_TICKET = gql`
  mutation holdTicket($holdTicket: HoldTicket!) {
    holdTicket(input: $holdTicket) {
      ... on HoldTicketSuccess {
        success
        ticketID
      }
      ... on HoldTicketError {
        success
        message
      }
    }
  }
`;

export const GET_TICKET_FOR_CONTRACTS = gql`
  query GetTickets($contracts: [String!]!) {
    getTicketsForContracts(contractAddresses: $contracts) {
      ... on GetTicketsForContractsError {
        success
        message
      }
      ... on GetTicketsForContractsSuccess {
        success
        ticket {
          id
          row
          eventID
          number
          type
          purchased
          updatedAt
          createdAt
        }
      }
    }
  }
`;
