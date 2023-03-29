/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** An ISO 8601-encoded datetime */
  ISO8601DateTime: any;
};

/** account which user is associated with */
export type Account = {
  __typename?: 'Account';
  /** time record created */
  createdAt: Scalars['ISO8601DateTime'];
  /** record unique identifier */
  id: Scalars['ID'];
  /** friendly unique identifier */
  slug: Scalars['String'];
  /** title of record */
  title: Scalars['String'];
  /** time record updated */
  updatedAt: Scalars['ISO8601DateTime'];
};

/** contact in a team or position */
export type Contact = {
  __typename?: 'Contact';
  /** account record belongs to */
  account: Account;
  /** contact avatar url */
  avatar?: Maybe<Scalars['String']>;
  /** time record created */
  createdAt: Scalars['ISO8601DateTime'];
  /** record sub-type */
  definition: Scalars['String'];
  /** contact's email addresses */
  emails: Array<Scalars['String']>;
  /** contact first name */
  firstName?: Maybe<Scalars['String']>;
  /** record unique identifier */
  id: Scalars['ID'];
  /** contact last name */
  lastName?: Maybe<Scalars['String']>;
  /** contact's phone numbers */
  phoneNumbers: Array<Scalars['String']>;
  /** realms the contact belongs to */
  realms: Array<Realm>;
  /** unique identifier in fluro */
  remoteId?: Maybe<Scalars['String']>;
  /** friendly unique identifier */
  slug: Scalars['String'];
  /** record status */
  status?: Maybe<Status>;
  /** teams the contact belongs to */
  teams: Array<Team>;
  /** title of record */
  title: Scalars['String'];
  /** time record updated */
  updatedAt: Scalars['ISO8601DateTime'];
};

/** Base Mutation Type */
export type Mutation = {
  __typename?: 'Mutation';
  /** authenticate a user */
  userLogin?: Maybe<UserLoginMutationPayload>;
};


/** Base Mutation Type */
export type MutationUserLoginArgs = {
  input: UserLoginMutationInput;
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
};

/** Base Query Type */
export type Query = {
  __typename?: 'Query';
  /** current user */
  me: User;
  /** retrieve team */
  team: Team;
};


/** Base Query Type */
export type QueryTeamArgs = {
  id: Scalars['ID'];
};

/** realm which controls permissions to associated objects */
export type Realm = {
  __typename?: 'Realm';
  /** account record belongs to */
  account: Account;
  /** realm background color */
  bgColor?: Maybe<Scalars['String']>;
  /** realm primary color */
  color?: Maybe<Scalars['String']>;
  /** time record created */
  createdAt: Scalars['ISO8601DateTime'];
  /** record sub-type */
  definition: Scalars['String'];
  /** record unique identifier */
  id: Scalars['ID'];
  /** optional parent record */
  parent?: Maybe<Realm>;
  /** friendly unique identifier */
  slug: Scalars['String'];
  /** record status */
  status?: Maybe<Status>;
  /** teams related to realm */
  teams: TeamConnection;
  /** title of record */
  title: Scalars['String'];
  /** time record updated */
  updatedAt: Scalars['ISO8601DateTime'];
};


/** realm which controls permissions to associated objects */
export type RealmTeamsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

/** record status enum */
export enum Status {
  Active = 'active',
  Archived = 'archived',
  Draft = 'draft'
}

/** team with members in positions */
export type Team = {
  __typename?: 'Team';
  /** account record belongs to */
  account: Account;
  /** team members */
  contacts: Array<Contact>;
  /** time record created */
  createdAt: Scalars['ISO8601DateTime'];
  /** record sub-type */
  definition: Scalars['String'];
  /** record unique identifier */
  id: Scalars['ID'];
  /** optional parent record */
  parent?: Maybe<Team>;
  /** realms the contact belongs to */
  realms: Array<Realm>;
  /** unique identifier in fluro */
  remoteId?: Maybe<Scalars['String']>;
  /** friendly unique identifier */
  slug: Scalars['String'];
  /** record status */
  status?: Maybe<Status>;
  /** title of record */
  title: Scalars['String'];
  /** time record updated */
  updatedAt: Scalars['ISO8601DateTime'];
};

/** The connection type for Team. */
export type TeamConnection = {
  __typename?: 'TeamConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<TeamEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<Team>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type TeamEdge = {
  __typename?: 'TeamEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<Team>;
};

/** a user belonging to the current account on fluro */
export type User = {
  __typename?: 'User';
  /** account record belongs to */
  account: Account;
  /** user avatar url */
  avatar?: Maybe<Scalars['String']>;
  /** contacts that user is connected with */
  contacts: Array<Contact>;
  /** time record created */
  createdAt: Scalars['ISO8601DateTime'];
  /** user email address */
  email?: Maybe<Scalars['String']>;
  /** user first name */
  firstName?: Maybe<Scalars['String']>;
  /** record unique identifier */
  id: Scalars['ID'];
  /** user last name */
  lastName?: Maybe<Scalars['String']>;
  /** user phone number */
  phoneNumber?: Maybe<Scalars['String']>;
  /** unique identifier in fluro */
  remoteId?: Maybe<Scalars['String']>;
  /** friendly unique identifier */
  slug: Scalars['String'];
  /** teams that contacts are connected with */
  teams: Array<Team>;
  /** title of record */
  title: Scalars['String'];
  /** time record updated */
  updatedAt: Scalars['ISO8601DateTime'];
};

/** Credentials of the user */
export type UserCredentialsInput = {
  /** Password of the user */
  password: Scalars['String'];
  /** Username of the user */
  username: Scalars['String'];
};

/** Autogenerated input type of UserLoginMutation */
export type UserLoginMutationInput = {
  /** Slug of account */
  accountSlug: Scalars['String'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** Credentials of the user */
  credentials: UserCredentialsInput;
};

/** Autogenerated return type of UserLoginMutation. */
export type UserLoginMutationPayload = {
  __typename?: 'UserLoginMutationPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** token to use as Authorization header as: Bearer 'token' */
  token?: Maybe<Scalars['String']>;
  /** user if credentials are valid */
  user?: Maybe<User>;
};

export type UserLoginMutationVariables = Exact<{
  input: UserLoginMutationInput;
}>;


export type UserLoginMutation = { __typename?: 'Mutation', userLogin?: { __typename?: 'UserLoginMutationPayload', apiToken?: string | null, user?: { __typename?: 'User', id: string, title: string, firstName?: string | null, lastName?: string | null, email?: string | null, phoneNumber?: string | null, remoteId?: string | null, avatar?: string | null } | null } | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, teams: Array<(
      { __typename?: 'Team' }
      & { ' $fragmentRefs'?: { 'TeamListTeamFragmentFragment': TeamListTeamFragmentFragment } }
    )> } };

export type TeamQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type TeamQuery = { __typename?: 'Query', team: { __typename?: 'Team', id: string, title: string, contacts: Array<{ __typename?: 'Contact', id: string, avatar?: string | null, firstName?: string | null, lastName?: string | null, title: string }> } };

export type TeamListTeamFragmentFragment = (
  { __typename?: 'Team', id: string, title: string, status?: Status | null, definition: string }
  & { ' $fragmentRefs'?: { 'TeamListItemTeamFragmentFragment': TeamListItemTeamFragmentFragment } }
) & { ' $fragmentName'?: 'TeamListTeamFragmentFragment' };

export type TeamListItemTeamFragmentFragment = { __typename?: 'Team', id: string, title: string, slug: string, contacts: Array<{ __typename?: 'Contact', id: string, title: string, avatar?: string | null, status?: Status | null }> } & { ' $fragmentName'?: 'TeamListItemTeamFragmentFragment' };

export const TeamListItemTeamFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TeamListItemTeamFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Team"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"contacts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<TeamListItemTeamFragmentFragment, unknown>;
export const TeamListTeamFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TeamListTeamFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Team"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"definition"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"TeamListItemTeamFragment"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TeamListItemTeamFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Team"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"contacts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<TeamListTeamFragmentFragment, unknown>;
export const UserLoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UserLogin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserLoginMutationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userLogin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"apiToken"},"name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"remoteId"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]}}]}}]} as unknown as DocumentNode<UserLoginMutation, UserLoginMutationVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"teams"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TeamListTeamFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TeamListItemTeamFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Team"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"contacts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TeamListTeamFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Team"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"definition"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"TeamListItemTeamFragment"}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const TeamDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Team"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"team"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"contacts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]} as unknown as DocumentNode<TeamQuery, TeamQueryVariables>;