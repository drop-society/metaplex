import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Time: any;
};

export type Chart = {
  __typename?: 'Chart';
  createdAt: Scalars['Time'];
  description: Scalars['String'];
  externalID: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedAt: Scalars['Time'];
};

export type Company = {
  __typename?: 'Company';
  createdAt: Scalars['Time'];
  emailSuffix: Scalars['String'];
  id: Scalars['ID'];
  identifier: Scalars['String'];
  name: Scalars['String'];
  updatedAt: Scalars['Time'];
};

export type CreateCompany = {
  emailSuffix: Scalars['String'];
  identifier: Scalars['String'];
  name: Scalars['String'];
};

export type CreateCompanyError = ResponseError & {
  __typename?: 'CreateCompanyError';
  code: Scalars['String'];
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type CreateCompanyResponse = CreateCompanyError | CreateCompanySuccess;

export type CreateCompanySuccess = Response & {
  __typename?: 'CreateCompanySuccess';
  companyID: Scalars['ID'];
  success: Scalars['Boolean'];
};

export type CreateEvent = {
  chartID: Scalars['ID'];
  contractID: Scalars['String'];
  createdAt: Scalars['Time'];
  description: Scalars['String'];
  externalID: Scalars['String'];
  id: Scalars['ID'];
  imageURI: Scalars['String'];
  minted: Scalars['Boolean'];
  name: Scalars['String'];
  time: Scalars['Time'];
  updatedAt: Scalars['Time'];
};

export type CreateEventError = ResponseError & {
  __typename?: 'CreateEventError';
  code: Scalars['String'];
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type CreateEventResponse = CreateEventError | CreateEventSuccess;

export type CreateEventSuccess = Response & {
  __typename?: 'CreateEventSuccess';
  event: Event;
  eventID: Scalars['ID'];
  success: Scalars['Boolean'];
};

export type CreateTeam = {
  companyID: Scalars['ID'];
  description: Scalars['String'];
  identifier: Scalars['String'];
  name: Scalars['String'];
};

export type CreateTeamError = ResponseError & {
  __typename?: 'CreateTeamError';
  code: Scalars['String'];
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type CreateTeamMember = {
  teamID: Scalars['ID'];
  userID: Scalars['ID'];
};

export type CreateTeamMemberError = ResponseError & {
  __typename?: 'CreateTeamMemberError';
  code: Scalars['String'];
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type CreateTeamMemberResponse = CreateTeamMemberError | CreateTeamMemberSuccess;

export type CreateTeamMemberSuccess = Response & {
  __typename?: 'CreateTeamMemberSuccess';
  success: Scalars['Boolean'];
};

export type CreateTeamResponse = CreateTeamError | CreateTeamSuccess;

export type CreateTeamSuccess = Response & {
  __typename?: 'CreateTeamSuccess';
  success: Scalars['Boolean'];
  teamID: Scalars['ID'];
};

export type CreateTeamWorkspace = {
  description: Scalars['String'];
  externalID: Scalars['String'];
  name: Scalars['String'];
  teamID: Scalars['ID'];
};

export type CreateTeamWorkspaceError = {
  __typename?: 'CreateTeamWorkspaceError';
  success: Scalars['Boolean'];
  teamWorkspaceID: Scalars['ID'];
};

export type CreateTeamWorkspaceResponse = CreateTeamWorkspaceError | CreateTeamWorkspaceSuccess;

export type CreateTeamWorkspaceSuccess = {
  __typename?: 'CreateTeamWorkspaceSuccess';
  success: Scalars['Boolean'];
  teamWorkspaceID: Scalars['ID'];
};

export type CreateTicket = {
  createdAt: Scalars['Time'];
  eventID: Scalars['ID'];
  externalID: Scalars['String'];
  number: Scalars['String'];
  row: Scalars['String'];
  type: Scalars['String'];
  updatedAt: Scalars['Time'];
};

export type CreateTicketError = ResponseError & {
  __typename?: 'CreateTicketError';
  code: Scalars['String'];
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type CreateTicketResponse = CreateTicketError | CreateTicketSuccess;

export type CreateTicketSuccess = Response & {
  __typename?: 'CreateTicketSuccess';
  success: Scalars['Boolean'];
  ticket: Ticket;
  ticketID: Scalars['ID'];
};

export type CreateUser = {
  displayName: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  role: Role;
};

export type CreateUserError = ResponseError & {
  __typename?: 'CreateUserError';
  code: Scalars['String'];
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type CreateUserResponse = CreateUserError | CreateUserSuccess;

export type CreateUserSuccess = Response & {
  __typename?: 'CreateUserSuccess';
  success: Scalars['Boolean'];
  userID: Scalars['ID'];
};

export type Event = {
  __typename?: 'Event';
  address: Scalars['String'];
  chartID: Scalars['ID'];
  contractID: Scalars['String'];
  createdAt: Scalars['Time'];
  description: Scalars['String'];
  externalID: Scalars['String'];
  id: Scalars['ID'];
  imageURI: Scalars['String'];
  minted: Scalars['Boolean'];
  name: Scalars['String'];
  time: Scalars['Time'];
  updatedAt: Scalars['Time'];
};

export type GetTicketError = ResponseError & {
  __typename?: 'GetTicketError';
  code: Scalars['String'];
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type GetTicketResponse = GetTicketError | GetTicketSuccess;

export type GetTicketSuccess = Response & {
  __typename?: 'GetTicketSuccess';
  success: Scalars['Boolean'];
  ticket: Ticket;
};

export type GetTicketsForContractsError = ResponseError & {
  __typename?: 'GetTicketsForContractsError';
  code: Scalars['String'];
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type GetTicketsForContractsResponse = GetTicketsForContractsError | GetTicketsForContractsSuccess;

export type GetTicketsForContractsSuccess = Response & {
  __typename?: 'GetTicketsForContractsSuccess';
  success: Scalars['Boolean'];
  ticket: Ticket;
};

export type GetUserError = ResponseError & {
  __typename?: 'GetUserError';
  code: Scalars['String'];
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type GetUserResponse = GetUserError | GetUserSuccess;

export type GetUserSuccess = Response & {
  __typename?: 'GetUserSuccess';
  success: Scalars['Boolean'];
  user: User;
};

export type HoldTicket = {
  expirary: Scalars['Time'];
  ticketID: Scalars['ID'];
  userID: Scalars['ID'];
};

export type HoldTicketError = ResponseError & {
  __typename?: 'HoldTicketError';
  code: Scalars['String'];
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type HoldTicketResponse = HoldTicketError | HoldTicketSuccess;

export type HoldTicketSuccess = Response & {
  __typename?: 'HoldTicketSuccess';
  success: Scalars['Boolean'];
  ticket: Ticket;
  ticketID: Scalars['ID'];
};

export type InviteTeamMember = {
  email: Scalars['String'];
  teamID: Scalars['ID'];
};

export type InviteTeamMemberError = ResponseError & {
  __typename?: 'InviteTeamMemberError';
  code: Scalars['String'];
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type InviteTeamMemberResponse = InviteTeamMemberError | InviteTeamMemberSuccess;

export type InviteTeamMemberSuccess = Response & {
  __typename?: 'InviteTeamMemberSuccess';
  success: Scalars['Boolean'];
  teamInviteID: Scalars['ID'];
};

export type LoginUser = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginUserFailed = Response & {
  __typename?: 'LoginUserFailed';
  code: Scalars['String'];
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type LoginUserResponse = LoginUserFailed | LoginUserSuccess;

export type LoginUserSuccess = Response & {
  __typename?: 'LoginUserSuccess';
  success: Scalars['Boolean'];
  token: Scalars['String'];
};

export type MintEvent = {
  contractID: Scalars['String'];
  id: Scalars['ID'];
};

export type MintEventError = ResponseError & {
  __typename?: 'MintEventError';
  code: Scalars['String'];
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type MintEventResponse = MintEventError | MintEventSuccess;

export type MintEventSuccess = Response & {
  __typename?: 'MintEventSuccess';
  event: Event;
  eventID: Scalars['ID'];
  success: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCompany: CreateCompanyResponse;
  createEvent: CreateEventResponse;
  createTeam: CreateTeamResponse;
  createTeamMember: CreateTeamMemberResponse;
  createTeamWorkspace: CreateTeamWorkspaceResponse;
  createTicket: CreateTicketResponse;
  createUser: CreateUserResponse;
  holdTicket: HoldTicketResponse;
  inviteTeamMember: InviteTeamMemberResponse;
  loginUser: LoginUserResponse;
  mintEvent: MintEventResponse;
  updateUser: UpdateUserResponse;
};


export type MutationCreateCompanyArgs = {
  input: CreateCompany;
};


export type MutationCreateEventArgs = {
  input: CreateEvent;
};


export type MutationCreateTeamArgs = {
  input: CreateTeam;
};


export type MutationCreateTeamMemberArgs = {
  input: CreateTeamMember;
};


export type MutationCreateTeamWorkspaceArgs = {
  input: CreateTeamWorkspace;
};


export type MutationCreateTicketArgs = {
  input: CreateTicket;
};


export type MutationCreateUserArgs = {
  input: CreateUser;
};


export type MutationHoldTicketArgs = {
  input: HoldTicket;
};


export type MutationInviteTeamMemberArgs = {
  input: InviteTeamMember;
};


export type MutationLoginUserArgs = {
  input?: Maybe<LoginUser>;
};


export type MutationMintEventArgs = {
  input: MintEvent;
};


export type MutationUpdateUserArgs = {
  input: UpdateUser;
};

export type NewOrder = {
  address: Scalars['String'];
  eventID: Scalars['ID'];
  ticket: Scalars['ID'];
  transactionID: Scalars['String'];
};

export type Order = {
  __typename?: 'Order';
  address: Scalars['String'];
  createdAt: Scalars['Time'];
  eventID: Scalars['ID'];
  id: Scalars['ID'];
  ticket: Scalars['ID'];
  transactionID: Scalars['String'];
  updatedAt: Scalars['Time'];
};

export type Query = {
  __typename?: 'Query';
  charts: Array<Chart>;
  companies: Array<Company>;
  events: Array<Event>;
  getTicket: GetTicketResponse;
  getTicketsForContracts: GetTicketsForContractsResponse;
  getUser: GetUserResponse;
  teamInvites: Array<TeamInvite>;
  teamMembers: Array<TeamMember>;
  teams: Array<Team>;
  tickets: Array<Ticket>;
  users: Array<User>;
};


export type QueryGetTicketArgs = {
  contractAddress: Scalars['String'];
  externalID: Scalars['String'];
  id: Scalars['ID'];
};


export type QueryGetTicketsForContractsArgs = {
  contractAddresses: Array<Scalars['String']>;
};

export type Response = {
  success?: Maybe<Scalars['Boolean']>;
};

export type ResponseError = {
  code: Scalars['String'];
  message?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
};

export enum Role {
  Admin = 'ADMIN',
  User = 'USER'
}

export type Team = {
  __typename?: 'Team';
  company: Company;
  createdAt: Scalars['Time'];
  description: Scalars['String'];
  id: Scalars['ID'];
  identifier: Scalars['String'];
  members: Array<User>;
  name: Scalars['String'];
  updatedAt: Scalars['Time'];
  workspaces: Array<TeamWorkspace>;
};

export type TeamInvite = {
  __typename?: 'TeamInvite';
  accepted?: Maybe<Scalars['Boolean']>;
  createdAt: Scalars['Time'];
  email: Scalars['String'];
  id: Scalars['ID'];
  teamID: Scalars['ID'];
  updatedAt: Scalars['Time'];
};

export type TeamMember = {
  __typename?: 'TeamMember';
  createdAt: Scalars['Time'];
  teamID: Scalars['ID'];
  updatedAt: Scalars['Time'];
  userID: Scalars['ID'];
};

export type TeamWorkspace = {
  __typename?: 'TeamWorkspace';
  createdAt: Scalars['Time'];
  description: Scalars['String'];
  externalID: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  teamID: Scalars['ID'];
  updatedAt: Scalars['Time'];
};

export type Ticket = {
  __typename?: 'Ticket';
  createdAt: Scalars['Time'];
  eventID: Scalars['String'];
  externalID: Scalars['String'];
  id: Scalars['ID'];
  number: Scalars['String'];
  purchased: Scalars['Boolean'];
  row: Scalars['String'];
  type: Scalars['String'];
  updatedAt: Scalars['Time'];
};

export type TicketHold = {
  __typename?: 'TicketHold';
  createdAt: Scalars['Time'];
  expirary: Scalars['Time'];
  externalID: Scalars['String'];
  id: Scalars['ID'];
  ticketID: Scalars['ID'];
  updatedAt: Scalars['Time'];
  userID: Scalars['ID'];
};

export type UpdateUser = {
  displayName: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  role: Role;
};

export type UpdateUserError = ResponseError & {
  __typename?: 'UpdateUserError';
  code: Scalars['String'];
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type UpdateUserResponse = UpdateUserError | UpdateUserSuccess;

export type UpdateUserSuccess = Response & {
  __typename?: 'UpdateUserSuccess';
  success: Scalars['Boolean'];
  userID: Scalars['ID'];
};

export type User = UserInterface & {
  __typename?: 'User';
  createdAt: Scalars['Time'];
  displayName: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  role: Role;
  teams: Array<Team>;
  updatedAt: Scalars['Time'];
};

export type UserInterface = {
  createdAt: Scalars['Time'];
  displayName: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  role: Role;
  teams: Array<Team>;
  updatedAt: Scalars['Time'];
};

export type UserService = UserInterface & {
  __typename?: 'UserService';
  createdAt: Scalars['Time'];
  displayName: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  role: Role;
  teams: Array<Team>;
  updatedAt: Scalars['Time'];
};

/**
 * A Directive provides a way to describe alternate runtime execution and type validation behavior in a GraphQL document.
 *
 * In some cases, you need to provide options to alter GraphQL's execution behavior in ways field arguments will not suffice, such as conditionally including or skipping a field. Directives provide this by describing additional information to the executor.
 */
export type __Directive = {
  __typename?: '__Directive';
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  isRepeatable: Scalars['Boolean'];
  locations: Array<__DirectiveLocation>;
  args: Array<__InputValue>;
};


/**
 * A Directive provides a way to describe alternate runtime execution and type validation behavior in a GraphQL document.
 *
 * In some cases, you need to provide options to alter GraphQL's execution behavior in ways field arguments will not suffice, such as conditionally including or skipping a field. Directives provide this by describing additional information to the executor.
 */
export type __DirectiveArgsArgs = {
  includeDeprecated?: Maybe<Scalars['Boolean']>;
};

/** A Directive can be adjacent to many parts of the GraphQL language, a __DirectiveLocation describes one such possible adjacencies. */
export enum __DirectiveLocation {
  /** Location adjacent to a query operation. */
  Query = 'QUERY',
  /** Location adjacent to a mutation operation. */
  Mutation = 'MUTATION',
  /** Location adjacent to a subscription operation. */
  Subscription = 'SUBSCRIPTION',
  /** Location adjacent to a field. */
  Field = 'FIELD',
  /** Location adjacent to a fragment definition. */
  FragmentDefinition = 'FRAGMENT_DEFINITION',
  /** Location adjacent to a fragment spread. */
  FragmentSpread = 'FRAGMENT_SPREAD',
  /** Location adjacent to an inline fragment. */
  InlineFragment = 'INLINE_FRAGMENT',
  /** Location adjacent to a variable definition. */
  VariableDefinition = 'VARIABLE_DEFINITION',
  /** Location adjacent to a schema definition. */
  Schema = 'SCHEMA',
  /** Location adjacent to a scalar definition. */
  Scalar = 'SCALAR',
  /** Location adjacent to an object type definition. */
  Object = 'OBJECT',
  /** Location adjacent to a field definition. */
  FieldDefinition = 'FIELD_DEFINITION',
  /** Location adjacent to an argument definition. */
  ArgumentDefinition = 'ARGUMENT_DEFINITION',
  /** Location adjacent to an interface definition. */
  Interface = 'INTERFACE',
  /** Location adjacent to a union definition. */
  Union = 'UNION',
  /** Location adjacent to an enum definition. */
  Enum = 'ENUM',
  /** Location adjacent to an enum value definition. */
  EnumValue = 'ENUM_VALUE',
  /** Location adjacent to an input object type definition. */
  InputObject = 'INPUT_OBJECT',
  /** Location adjacent to an input object field definition. */
  InputFieldDefinition = 'INPUT_FIELD_DEFINITION'
}

/** One possible value for a given Enum. Enum values are unique values, not a placeholder for a string or numeric value. However an Enum value is returned in a JSON response as a string. */
export type __EnumValue = {
  __typename?: '__EnumValue';
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  isDeprecated: Scalars['Boolean'];
  deprecationReason?: Maybe<Scalars['String']>;
};

/** Object and Interface types are described by a list of Fields, each of which has a name, potentially a list of arguments, and a return type. */
export type __Field = {
  __typename?: '__Field';
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  args: Array<__InputValue>;
  type: __Type;
  isDeprecated: Scalars['Boolean'];
  deprecationReason?: Maybe<Scalars['String']>;
};


/** Object and Interface types are described by a list of Fields, each of which has a name, potentially a list of arguments, and a return type. */
export type __FieldArgsArgs = {
  includeDeprecated?: Maybe<Scalars['Boolean']>;
};

/** Arguments provided to Fields or Directives and the input fields of an InputObject are represented as Input Values which describe their type and optionally a default value. */
export type __InputValue = {
  __typename?: '__InputValue';
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  type: __Type;
  /** A GraphQL-formatted string representing the default value for this input value. */
  defaultValue?: Maybe<Scalars['String']>;
  isDeprecated: Scalars['Boolean'];
  deprecationReason?: Maybe<Scalars['String']>;
};

/** A GraphQL Schema defines the capabilities of a GraphQL server. It exposes all available types and directives on the server, as well as the entry points for query, mutation, and subscription operations. */
export type __Schema = {
  __typename?: '__Schema';
  description?: Maybe<Scalars['String']>;
  /** A list of all types supported by this server. */
  types: Array<__Type>;
  /** The type that query operations will be rooted at. */
  queryType: __Type;
  /** If this server supports mutation, the type that mutation operations will be rooted at. */
  mutationType?: Maybe<__Type>;
  /** If this server support subscription, the type that subscription operations will be rooted at. */
  subscriptionType?: Maybe<__Type>;
  /** A list of all directives supported by this server. */
  directives: Array<__Directive>;
};

/**
 * The fundamental unit of any GraphQL Schema is the type. There are many kinds of types in GraphQL as represented by the `__TypeKind` enum.
 *
 * Depending on the kind of a type, certain fields describe information about that type. Scalar types provide no information beyond a name, description and optional `specifiedByUrl`, while Enum types provide their values. Object and Interface types provide the fields they describe. Abstract types, Union and Interface, provide the Object types possible at runtime. List and NonNull types compose other types.
 */
export type __Type = {
  __typename?: '__Type';
  kind: __TypeKind;
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  specifiedByUrl?: Maybe<Scalars['String']>;
  fields?: Maybe<Array<__Field>>;
  interfaces?: Maybe<Array<__Type>>;
  possibleTypes?: Maybe<Array<__Type>>;
  enumValues?: Maybe<Array<__EnumValue>>;
  inputFields?: Maybe<Array<__InputValue>>;
  ofType?: Maybe<__Type>;
};


/**
 * The fundamental unit of any GraphQL Schema is the type. There are many kinds of types in GraphQL as represented by the `__TypeKind` enum.
 *
 * Depending on the kind of a type, certain fields describe information about that type. Scalar types provide no information beyond a name, description and optional `specifiedByUrl`, while Enum types provide their values. Object and Interface types provide the fields they describe. Abstract types, Union and Interface, provide the Object types possible at runtime. List and NonNull types compose other types.
 */
export type __TypeFieldsArgs = {
  includeDeprecated?: Maybe<Scalars['Boolean']>;
};


/**
 * The fundamental unit of any GraphQL Schema is the type. There are many kinds of types in GraphQL as represented by the `__TypeKind` enum.
 *
 * Depending on the kind of a type, certain fields describe information about that type. Scalar types provide no information beyond a name, description and optional `specifiedByUrl`, while Enum types provide their values. Object and Interface types provide the fields they describe. Abstract types, Union and Interface, provide the Object types possible at runtime. List and NonNull types compose other types.
 */
export type __TypeEnumValuesArgs = {
  includeDeprecated?: Maybe<Scalars['Boolean']>;
};


/**
 * The fundamental unit of any GraphQL Schema is the type. There are many kinds of types in GraphQL as represented by the `__TypeKind` enum.
 *
 * Depending on the kind of a type, certain fields describe information about that type. Scalar types provide no information beyond a name, description and optional `specifiedByUrl`, while Enum types provide their values. Object and Interface types provide the fields they describe. Abstract types, Union and Interface, provide the Object types possible at runtime. List and NonNull types compose other types.
 */
export type __TypeInputFieldsArgs = {
  includeDeprecated?: Maybe<Scalars['Boolean']>;
};

/** An enum describing what kind of type a given `__Type` is. */
export enum __TypeKind {
  /** Indicates this type is a scalar. */
  Scalar = 'SCALAR',
  /** Indicates this type is an object. `fields` and `interfaces` are valid fields. */
  Object = 'OBJECT',
  /** Indicates this type is an interface. `fields`, `interfaces`, and `possibleTypes` are valid fields. */
  Interface = 'INTERFACE',
  /** Indicates this type is a union. `possibleTypes` is a valid field. */
  Union = 'UNION',
  /** Indicates this type is an enum. `enumValues` is a valid field. */
  Enum = 'ENUM',
  /** Indicates this type is an input object. `inputFields` is a valid field. */
  InputObject = 'INPUT_OBJECT',
  /** Indicates this type is a list. `ofType` is a valid field. */
  List = 'LIST',
  /** Indicates this type is a non-null. `ofType` is a valid field. */
  NonNull = 'NON_NULL'
}

export type CreateCompanyMutationVariables = Exact<{
  name: Scalars['String'];
  identifier: Scalars['String'];
  emailSuffix: Scalars['String'];
}>;


export type CreateCompanyMutation = { __typename?: 'Mutation', createCompany: { __typename?: 'CreateCompanyError', message: string, success: boolean } | { __typename?: 'CreateCompanySuccess', companyID: string, success: boolean } };

export type TypeRefFragment = { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined } | null | undefined } | null | undefined } | null | undefined } | null | undefined } | null | undefined } | null | undefined } | null | undefined };

export type InputValueFragment = { __typename?: '__InputValue', name: string, description?: string | null | undefined, defaultValue?: string | null | undefined, type: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined } | null | undefined } | null | undefined } | null | undefined } | null | undefined } | null | undefined } | null | undefined } | null | undefined } };

export type FullTypeFragment = { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, description?: string | null | undefined, fields?: Array<{ __typename?: '__Field', name: string, description?: string | null | undefined, isDeprecated: boolean, deprecationReason?: string | null | undefined, args: Array<{ __typename?: '__InputValue', name: string, description?: string | null | undefined, defaultValue?: string | null | undefined, type: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined } | null | undefined } | null | undefined } | null | undefined } | null | undefined } | null | undefined } | null | undefined } | null | undefined } }>, type: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined } | null | undefined } | null | undefined } | null | undefined } | null | undefined } | null | undefined } | null | undefined } | null | undefined } }> | null | undefined, inputFields?: Array<{ __typename?: '__InputValue', name: string, description?: string | null | undefined, defaultValue?: string | null | undefined, type: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined } | null | undefined } | null | undefined } | null | undefined } | null | undefined } | null | undefined } | null | undefined } | null | undefined } }> | null | undefined, interfaces?: Array<{ __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined } | null | undefined } | null | undefined } | null | undefined } | null | undefined } | null | undefined } | null | undefined } | null | undefined }> | null | undefined, enumValues?: Array<{ __typename?: '__EnumValue', name: string, description?: string | null | undefined, isDeprecated: boolean, deprecationReason?: string | null | undefined }> | null | undefined, possibleTypes?: Array<{ __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined } | null | undefined } | null | undefined } | null | undefined } | null | undefined } | null | undefined } | null | undefined } | null | undefined }> | null | undefined };

export type IntrospectionQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type IntrospectionQueryQuery = { __typename?: 'Query', __schema: { __typename?: '__Schema', queryType: { __typename?: '__Type', name?: string | null | undefined }, mutationType?: { __typename?: '__Type', name?: string | null | undefined } | null | undefined, subscriptionType?: { __typename?: '__Type', name?: string | null | undefined } | null | undefined, types: Array<{ __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, description?: string | null | undefined, fields?: Array<{ __typename?: '__Field', name: string, description?: string | null | undefined, isDeprecated: boolean, deprecationReason?: string | null | undefined, args: Array<{ __typename?: '__InputValue', name: string, description?: string | null | undefined, defaultValue?: string | null | undefined, type: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined } | null | undefined } | null | undefined } | null | undefined } | null | undefined } | null | undefined } | null | undefined } | null | undefined } }>, type: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined } | null | undefined } | null | undefined } | null | undefined } | null | undefined } | null | undefined } | null | undefined } | null | undefined } }> | null | undefined, inputFields?: Array<{ __typename?: '__InputValue', name: string, description?: string | null | undefined, defaultValue?: string | null | undefined, type: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined } | null | undefined } | null | undefined } | null | undefined } | null | undefined } | null | undefined } | null | undefined } | null | undefined } }> | null | undefined, interfaces?: Array<{ __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined } | null | undefined } | null | undefined } | null | undefined } | null | undefined } | null | undefined } | null | undefined } | null | undefined }> | null | undefined, enumValues?: Array<{ __typename?: '__EnumValue', name: string, description?: string | null | undefined, isDeprecated: boolean, deprecationReason?: string | null | undefined }> | null | undefined, possibleTypes?: Array<{ __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined } | null | undefined } | null | undefined } | null | undefined } | null | undefined } | null | undefined } | null | undefined } | null | undefined }> | null | undefined }>, directives: Array<{ __typename?: '__Directive', name: string, description?: string | null | undefined, locations: Array<__DirectiveLocation>, args: Array<{ __typename?: '__InputValue', name: string, description?: string | null | undefined, defaultValue?: string | null | undefined, type: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined } | null | undefined } | null | undefined } | null | undefined } | null | undefined } | null | undefined } | null | undefined } | null | undefined } }> }> } };

export type GetTypeQueryVariables = Exact<{
  type: Scalars['String'];
}>;


export type GetTypeQuery = { __typename?: 'Query', __type?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, description?: string | null | undefined, fields?: Array<{ __typename?: '__Field', name: string, description?: string | null | undefined, isDeprecated: boolean, deprecationReason?: string | null | undefined, args: Array<{ __typename?: '__InputValue', name: string, description?: string | null | undefined, defaultValue?: string | null | undefined, type: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined } | null | undefined } | null | undefined } | null | undefined } | null | undefined } | null | undefined } | null | undefined } | null | undefined } }>, type: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined } | null | undefined } | null | undefined } | null | undefined } | null | undefined } | null | undefined } | null | undefined } | null | undefined } }> | null | undefined, inputFields?: Array<{ __typename?: '__InputValue', name: string, description?: string | null | undefined, defaultValue?: string | null | undefined, type: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined } | null | undefined } | null | undefined } | null | undefined } | null | undefined } | null | undefined } | null | undefined } | null | undefined } }> | null | undefined, interfaces?: Array<{ __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined } | null | undefined } | null | undefined } | null | undefined } | null | undefined } | null | undefined } | null | undefined } | null | undefined }> | null | undefined, enumValues?: Array<{ __typename?: '__EnumValue', name: string, description?: string | null | undefined, isDeprecated: boolean, deprecationReason?: string | null | undefined }> | null | undefined, possibleTypes?: Array<{ __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined, ofType?: { __typename?: '__Type', kind: __TypeKind, name?: string | null | undefined } | null | undefined } | null | undefined } | null | undefined } | null | undefined } | null | undefined } | null | undefined } | null | undefined }> | null | undefined } | null | undefined };

export type CreateTeamMutationVariables = Exact<{
  name: Scalars['String'];
  description: Scalars['String'];
  identifier: Scalars['String'];
  companyID: Scalars['ID'];
}>;


export type CreateTeamMutation = { __typename?: 'Mutation', createTeam: { __typename?: 'CreateTeamError', message: string, success: boolean } | { __typename?: 'CreateTeamSuccess', teamID: string, success: boolean } };

export type CreateTicketMutationVariables = Exact<{
  createTicketInput: CreateTicket;
}>;


export type CreateTicketMutation = { __typename?: 'Mutation', createTicket: { __typename?: 'CreateTicketError' } | { __typename?: 'CreateTicketSuccess', success: boolean, ticketID: string, ticket: { __typename?: 'Ticket', id: string, row: string, eventID: string, number: string, type: string, purchased: boolean, updatedAt: any, createdAt: any } } };

export type HoldTicketMutationVariables = Exact<{
  holdTicket: HoldTicket;
}>;


export type HoldTicketMutation = { __typename?: 'Mutation', holdTicket: { __typename?: 'HoldTicketError', success: boolean, message: string } | { __typename?: 'HoldTicketSuccess', success: boolean, ticketID: string } };

export type GetTicketsQueryVariables = Exact<{
  contracts: Array<Scalars['String']> | Scalars['String'];
}>;


export type GetTicketsQuery = { __typename?: 'Query', getTicketsForContracts: { __typename?: 'GetTicketsForContractsError', success: boolean, message: string } | { __typename?: 'GetTicketsForContractsSuccess', success: boolean, ticket: { __typename?: 'Ticket', id: string, row: string, eventID: string, number: string, type: string, purchased: boolean, updatedAt: any, createdAt: any } } };

export type CreateUserMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  displayName: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  role: Role;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'CreateUserError', success: boolean, message: string } | { __typename?: 'CreateUserSuccess', success: boolean, userID: string } };

export type LoginUserMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginUserMutation = { __typename?: 'Mutation', loginUser: { __typename?: 'LoginUserFailed', success: boolean, message: string } | { __typename?: 'LoginUserSuccess', success: boolean, token: string } };

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = { __typename?: 'Query', getUser: { __typename?: 'GetUserError', message: string, success: boolean } | { __typename?: 'GetUserSuccess', user: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, displayName: string, teams: Array<{ __typename?: 'Team', name: string, description: string, identifier: string, company: { __typename?: 'Company', name: string, identifier: string } }> } } };

export const TypeRefFragmentDoc = gql`
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
export const InputValueFragmentDoc = gql`
    fragment InputValue on __InputValue {
  name
  description
  type {
    ...TypeRef
  }
  defaultValue
}
    ${TypeRefFragmentDoc}`;
export const FullTypeFragmentDoc = gql`
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
    ${InputValueFragmentDoc}
${TypeRefFragmentDoc}`;
export const CreateCompanyDocument = gql`
    mutation CreateCompany($name: String!, $identifier: String!, $emailSuffix: String!) {
  createCompany(
    input: {name: $name, identifier: $identifier, emailSuffix: $emailSuffix}
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
export type CreateCompanyMutationFn = Apollo.MutationFunction<CreateCompanyMutation, CreateCompanyMutationVariables>;

/**
 * __useCreateCompanyMutation__
 *
 * To run a mutation, you first call `useCreateCompanyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCompanyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCompanyMutation, { data, loading, error }] = useCreateCompanyMutation({
 *   variables: {
 *      name: // value for 'name'
 *      identifier: // value for 'identifier'
 *      emailSuffix: // value for 'emailSuffix'
 *   },
 * });
 */
export function useCreateCompanyMutation(baseOptions?: Apollo.MutationHookOptions<CreateCompanyMutation, CreateCompanyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCompanyMutation, CreateCompanyMutationVariables>(CreateCompanyDocument, options);
      }
export type CreateCompanyMutationHookResult = ReturnType<typeof useCreateCompanyMutation>;
export type CreateCompanyMutationResult = Apollo.MutationResult<CreateCompanyMutation>;
export type CreateCompanyMutationOptions = Apollo.BaseMutationOptions<CreateCompanyMutation, CreateCompanyMutationVariables>;
export const IntrospectionQueryDocument = gql`
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
    ${FullTypeFragmentDoc}
${InputValueFragmentDoc}`;

/**
 * __useIntrospectionQueryQuery__
 *
 * To run a query within a React component, call `useIntrospectionQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useIntrospectionQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIntrospectionQueryQuery({
 *   variables: {
 *   },
 * });
 */
export function useIntrospectionQueryQuery(baseOptions?: Apollo.QueryHookOptions<IntrospectionQueryQuery, IntrospectionQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IntrospectionQueryQuery, IntrospectionQueryQueryVariables>(IntrospectionQueryDocument, options);
      }
export function useIntrospectionQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IntrospectionQueryQuery, IntrospectionQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IntrospectionQueryQuery, IntrospectionQueryQueryVariables>(IntrospectionQueryDocument, options);
        }
export type IntrospectionQueryQueryHookResult = ReturnType<typeof useIntrospectionQueryQuery>;
export type IntrospectionQueryLazyQueryHookResult = ReturnType<typeof useIntrospectionQueryLazyQuery>;
export type IntrospectionQueryQueryResult = Apollo.QueryResult<IntrospectionQueryQuery, IntrospectionQueryQueryVariables>;
export const GetTypeDocument = gql`
    query GetType($type: String!) {
  __type(name: $type) {
    ...FullType
  }
}
    ${FullTypeFragmentDoc}`;

/**
 * __useGetTypeQuery__
 *
 * To run a query within a React component, call `useGetTypeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTypeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTypeQuery({
 *   variables: {
 *      type: // value for 'type'
 *   },
 * });
 */
export function useGetTypeQuery(baseOptions: Apollo.QueryHookOptions<GetTypeQuery, GetTypeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTypeQuery, GetTypeQueryVariables>(GetTypeDocument, options);
      }
export function useGetTypeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTypeQuery, GetTypeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTypeQuery, GetTypeQueryVariables>(GetTypeDocument, options);
        }
export type GetTypeQueryHookResult = ReturnType<typeof useGetTypeQuery>;
export type GetTypeLazyQueryHookResult = ReturnType<typeof useGetTypeLazyQuery>;
export type GetTypeQueryResult = Apollo.QueryResult<GetTypeQuery, GetTypeQueryVariables>;
export const CreateTeamDocument = gql`
    mutation CreateTeam($name: String!, $description: String!, $identifier: String!, $companyID: ID!) {
  createTeam(
    input: {name: $name, identifier: $identifier, description: $description, companyID: $companyID}
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
export type CreateTeamMutationFn = Apollo.MutationFunction<CreateTeamMutation, CreateTeamMutationVariables>;

/**
 * __useCreateTeamMutation__
 *
 * To run a mutation, you first call `useCreateTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTeamMutation, { data, loading, error }] = useCreateTeamMutation({
 *   variables: {
 *      name: // value for 'name'
 *      description: // value for 'description'
 *      identifier: // value for 'identifier'
 *      companyID: // value for 'companyID'
 *   },
 * });
 */
export function useCreateTeamMutation(baseOptions?: Apollo.MutationHookOptions<CreateTeamMutation, CreateTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTeamMutation, CreateTeamMutationVariables>(CreateTeamDocument, options);
      }
export type CreateTeamMutationHookResult = ReturnType<typeof useCreateTeamMutation>;
export type CreateTeamMutationResult = Apollo.MutationResult<CreateTeamMutation>;
export type CreateTeamMutationOptions = Apollo.BaseMutationOptions<CreateTeamMutation, CreateTeamMutationVariables>;
export const CreateTicketDocument = gql`
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
export type CreateTicketMutationFn = Apollo.MutationFunction<CreateTicketMutation, CreateTicketMutationVariables>;

/**
 * __useCreateTicketMutation__
 *
 * To run a mutation, you first call `useCreateTicketMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTicketMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTicketMutation, { data, loading, error }] = useCreateTicketMutation({
 *   variables: {
 *      createTicketInput: // value for 'createTicketInput'
 *   },
 * });
 */
export function useCreateTicketMutation(baseOptions?: Apollo.MutationHookOptions<CreateTicketMutation, CreateTicketMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTicketMutation, CreateTicketMutationVariables>(CreateTicketDocument, options);
      }
export type CreateTicketMutationHookResult = ReturnType<typeof useCreateTicketMutation>;
export type CreateTicketMutationResult = Apollo.MutationResult<CreateTicketMutation>;
export type CreateTicketMutationOptions = Apollo.BaseMutationOptions<CreateTicketMutation, CreateTicketMutationVariables>;
export const HoldTicketDocument = gql`
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
export type HoldTicketMutationFn = Apollo.MutationFunction<HoldTicketMutation, HoldTicketMutationVariables>;

/**
 * __useHoldTicketMutation__
 *
 * To run a mutation, you first call `useHoldTicketMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useHoldTicketMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [holdTicketMutation, { data, loading, error }] = useHoldTicketMutation({
 *   variables: {
 *      holdTicket: // value for 'holdTicket'
 *   },
 * });
 */
export function useHoldTicketMutation(baseOptions?: Apollo.MutationHookOptions<HoldTicketMutation, HoldTicketMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<HoldTicketMutation, HoldTicketMutationVariables>(HoldTicketDocument, options);
      }
export type HoldTicketMutationHookResult = ReturnType<typeof useHoldTicketMutation>;
export type HoldTicketMutationResult = Apollo.MutationResult<HoldTicketMutation>;
export type HoldTicketMutationOptions = Apollo.BaseMutationOptions<HoldTicketMutation, HoldTicketMutationVariables>;
export const GetTicketsDocument = gql`
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

/**
 * __useGetTicketsQuery__
 *
 * To run a query within a React component, call `useGetTicketsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTicketsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTicketsQuery({
 *   variables: {
 *      contracts: // value for 'contracts'
 *   },
 * });
 */
export function useGetTicketsQuery(baseOptions: Apollo.QueryHookOptions<GetTicketsQuery, GetTicketsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTicketsQuery, GetTicketsQueryVariables>(GetTicketsDocument, options);
      }
export function useGetTicketsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTicketsQuery, GetTicketsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTicketsQuery, GetTicketsQueryVariables>(GetTicketsDocument, options);
        }
export type GetTicketsQueryHookResult = ReturnType<typeof useGetTicketsQuery>;
export type GetTicketsLazyQueryHookResult = ReturnType<typeof useGetTicketsLazyQuery>;
export type GetTicketsQueryResult = Apollo.QueryResult<GetTicketsQuery, GetTicketsQueryVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($email: String!, $password: String!, $displayName: String!, $firstName: String!, $lastName: String!, $role: Role!) {
  createUser(
    input: {email: $email, password: $password, displayName: $displayName, firstName: $firstName, lastName: $lastName, role: $role}
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
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      displayName: // value for 'displayName'
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      role: // value for 'role'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const LoginUserDocument = gql`
    mutation loginUser($email: String!, $password: String!) {
  loginUser(input: {email: $email, password: $password}) {
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
export type LoginUserMutationFn = Apollo.MutationFunction<LoginUserMutation, LoginUserMutationVariables>;

/**
 * __useLoginUserMutation__
 *
 * To run a mutation, you first call `useLoginUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginUserMutation, { data, loading, error }] = useLoginUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginUserMutation(baseOptions?: Apollo.MutationHookOptions<LoginUserMutation, LoginUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginUserMutation, LoginUserMutationVariables>(LoginUserDocument, options);
      }
export type LoginUserMutationHookResult = ReturnType<typeof useLoginUserMutation>;
export type LoginUserMutationResult = Apollo.MutationResult<LoginUserMutation>;
export type LoginUserMutationOptions = Apollo.BaseMutationOptions<LoginUserMutation, LoginUserMutationVariables>;
export const GetUserDocument = gql`
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

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserQuery(baseOptions?: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;