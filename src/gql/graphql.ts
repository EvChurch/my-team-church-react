/* eslint-disable */
import * as yup from 'yup'
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
  /** An ISO 8601-encoded date */
  ISO8601Date: string;
  /** An ISO 8601-encoded datetime */
  ISO8601DateTime: string;
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
  /** objectives this contact has */
  objectives: Array<Objective>;
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

/** The connection type for Contact. */
export type ContactConnection = {
  __typename?: 'ContactConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<ContactEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<Contact>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** total number of items */
  totalCount: Scalars['Int'];
};

/** An edge in a connection. */
export type ContactEdge = {
  __typename?: 'ContactEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<Contact>;
};

/** result kind enum */
export enum Measurement {
  Currency = 'currency',
  Numerical = 'numerical',
  Percentage = 'percentage'
}

/** Base Mutation Type */
export type Mutation = {
  __typename?: 'Mutation';
  /** create an activity belonging to a objective */
  objectiveActivityCreate?: Maybe<ObjectiveActivityCreateMutationPayload>;
  /** create an objective */
  objectiveCreate?: Maybe<ObjectiveCreateMutationPayload>;
  /** delete objective */
  objectiveDelete?: Maybe<ObjectiveDeleteMutationPayload>;
  /** create a result belonging to an objective */
  objectiveResultCreate?: Maybe<ObjectiveResultCreateMutationPayload>;
  /** delete result */
  objectiveResultDelete?: Maybe<ObjectiveResultDeleteMutationPayload>;
  /** authenticate a user */
  userLogin?: Maybe<UserLoginMutationPayload>;
};


/** Base Mutation Type */
export type MutationObjectiveActivityCreateArgs = {
  input: ObjectiveActivityCreateMutationInput;
};


/** Base Mutation Type */
export type MutationObjectiveCreateArgs = {
  input: ObjectiveCreateMutationInput;
};


/** Base Mutation Type */
export type MutationObjectiveDeleteArgs = {
  input: ObjectiveDeleteMutationInput;
};


/** Base Mutation Type */
export type MutationObjectiveResultCreateArgs = {
  input: ObjectiveResultCreateMutationInput;
};


/** Base Mutation Type */
export type MutationObjectiveResultDeleteArgs = {
  input: ObjectiveResultDeleteMutationInput;
};


/** Base Mutation Type */
export type MutationUserLoginArgs = {
  input: UserLoginMutationInput;
};

/** objective for a team */
export type Objective = {
  __typename?: 'Objective';
  /** account record belongs to */
  account: Account;
  /** activities connected with objective */
  activities: Array<ObjectiveActivity>;
  /** contact objective belongs to */
  contact: Contact;
  /** time record created */
  createdAt: Scalars['ISO8601DateTime'];
  /** description of objective */
  description?: Maybe<Scalars['String']>;
  /** date objective due */
  dueAt: Scalars['ISO8601Date'];
  /** record unique identifier */
  id: Scalars['ID'];
  /** percentage of all results current value */
  percentage: Scalars['Int'];
  /** current progress */
  progress: Progress;
  /** results contributing to objective */
  results: Array<ObjectiveResult>;
  /** record status */
  status?: Maybe<Status>;
  /** team objective belongs to */
  team: Team;
  /** title of record */
  title: Scalars['String'];
  /** time record updated */
  updatedAt: Scalars['ISO8601DateTime'];
};

/** activity for an objective */
export type ObjectiveActivity = {
  __typename?: 'ObjectiveActivity';
  /** account record belongs to */
  account: Account;
  /** comment on activity */
  comment?: Maybe<Scalars['String']>;
  /** contact activity belongs to */
  contact: Contact;
  /** time record created */
  createdAt: Scalars['ISO8601DateTime'];
  /** current value */
  currentValue?: Maybe<Scalars['Float']>;
  /** record unique identifier */
  id: Scalars['ID'];
  /** kind of activity */
  kind: ObjectiveActivityKind;
  /** objective activity belongs to */
  objective: Objective;
  /** current progress */
  progress?: Maybe<Progress>;
  /** result activity updated */
  result: ObjectiveResult;
  /** time record updated */
  updatedAt: Scalars['ISO8601DateTime'];
};

/** The connection type for ObjectiveActivity. */
export type ObjectiveActivityConnection = {
  __typename?: 'ObjectiveActivityConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<ObjectiveActivityEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<ObjectiveActivity>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** total number of items */
  totalCount: Scalars['Int'];
};

/** Autogenerated input type of ObjectiveActivityCreateMutation */
export type ObjectiveActivityCreateMutationInput = {
  /** activity to create */
  activity: ObjectiveActivityInput;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
};

/** Autogenerated return type of ObjectiveActivityCreateMutation. */
export type ObjectiveActivityCreateMutationPayload = {
  __typename?: 'ObjectiveActivityCreateMutationPayload';
  /** created activity */
  activity?: Maybe<ObjectiveActivity>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** An edge in a connection. */
export type ObjectiveActivityEdge = {
  __typename?: 'ObjectiveActivityEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<ObjectiveActivity>;
};

/** activity attributes */
export type ObjectiveActivityInput = {
  /** comment */
  comment?: InputMaybe<Scalars['String']>;
  /** lead contact */
  contactId: Scalars['ID'];
  /** start value (only applies if resultId present and kind is update) */
  currentValue?: InputMaybe<Scalars['Float']>;
  /** kind of activity */
  kind: ObjectiveActivityKind;
  /** owner objective */
  objectiveId: Scalars['ID'];
  /** progress of activity (resultId present and kind progress_update) */
  progress?: InputMaybe<Progress>;
  /** result to update */
  resultId?: InputMaybe<Scalars['ID']>;
};

/** activity kind enum */
export enum ObjectiveActivityKind {
  Note = 'note',
  ProgressUpdate = 'progress_update'
}

/** The connection type for Objective. */
export type ObjectiveConnection = {
  __typename?: 'ObjectiveConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<ObjectiveEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<Objective>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** total number of items */
  totalCount: Scalars['Int'];
};

/** Autogenerated input type of ObjectiveCreateMutation */
export type ObjectiveCreateMutationInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** objective to create */
  objective: ObjectiveInput;
};

/** Autogenerated return type of ObjectiveCreateMutation. */
export type ObjectiveCreateMutationPayload = {
  __typename?: 'ObjectiveCreateMutationPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** created objective */
  objective?: Maybe<Objective>;
};

/** Autogenerated input type of ObjectiveDeleteMutation */
export type ObjectiveDeleteMutationInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** objective id to delete */
  id: Scalars['ID'];
};

/** Autogenerated return type of ObjectiveDeleteMutation. */
export type ObjectiveDeleteMutationPayload = {
  __typename?: 'ObjectiveDeleteMutationPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** id of objective after delete */
  id?: Maybe<Scalars['ID']>;
};

/** An edge in a connection. */
export type ObjectiveEdge = {
  __typename?: 'ObjectiveEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<Objective>;
};

/** objective attributes */
export type ObjectiveInput = {
  /** lead contact */
  contactId: Scalars['ID'];
  /** title of objective */
  description?: InputMaybe<Scalars['String']>;
  /** date that objective is due to complete */
  dueAt: Scalars['ISO8601Date'];
  /** status of objective */
  status: Status;
  /** owner team */
  teamId: Scalars['ID'];
  /** title of objective */
  title: Scalars['String'];
};

/** result for a objective */
export type ObjectiveResult = {
  __typename?: 'ObjectiveResult';
  /** account record belongs to */
  account: Account;
  /** activities connected with result */
  activities: Array<ObjectiveActivity>;
  /** contact result belongs to */
  contact: Contact;
  /** time record created */
  createdAt: Scalars['ISO8601DateTime'];
  /** current value */
  currentValue?: Maybe<Scalars['Float']>;
  /** description of result */
  description?: Maybe<Scalars['String']>;
  /** date result due */
  dueAt?: Maybe<Scalars['ISO8601Date']>;
  /** record unique identifier */
  id: Scalars['ID'];
  /** kind of result */
  kind: ObjectiveResultKind;
  /** measurement to use */
  measurement: Measurement;
  /** objective result belongs to */
  objective: Objective;
  /** current value expressed as a percentage */
  percentage: Scalars['Int'];
  /** current progress */
  progress: Progress;
  /** date result started */
  startAt?: Maybe<Scalars['ISO8601Date']>;
  /** start value */
  startValue: Scalars['Float'];
  /** record status */
  status: Status;
  /** target value */
  targetValue: Scalars['Float'];
  /** title of record */
  title: Scalars['String'];
  /** time record updated */
  updatedAt: Scalars['ISO8601DateTime'];
};

/** The connection type for ObjectiveResult. */
export type ObjectiveResultConnection = {
  __typename?: 'ObjectiveResultConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<ObjectiveResultEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<ObjectiveResult>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** total number of items */
  totalCount: Scalars['Int'];
};

/** Autogenerated input type of ObjectiveResultCreateMutation */
export type ObjectiveResultCreateMutationInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** result to create */
  result: ObjectiveResultInput;
};

/** Autogenerated return type of ObjectiveResultCreateMutation. */
export type ObjectiveResultCreateMutationPayload = {
  __typename?: 'ObjectiveResultCreateMutationPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** created result */
  result?: Maybe<ObjectiveResult>;
};

/** Autogenerated input type of ObjectiveResultDeleteMutation */
export type ObjectiveResultDeleteMutationInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** result id to delete */
  id: Scalars['ID'];
};

/** Autogenerated return type of ObjectiveResultDeleteMutation. */
export type ObjectiveResultDeleteMutationPayload = {
  __typename?: 'ObjectiveResultDeleteMutationPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** id of result after delete */
  id?: Maybe<Scalars['ID']>;
};

/** An edge in a connection. */
export type ObjectiveResultEdge = {
  __typename?: 'ObjectiveResultEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<ObjectiveResult>;
};

/** result attributes */
export type ObjectiveResultInput = {
  /** lead contact */
  contactId: Scalars['ID'];
  /** title of result */
  description?: InputMaybe<Scalars['String']>;
  /** date that result is due to complete */
  dueAt?: InputMaybe<Scalars['ISO8601Date']>;
  /** kind of result */
  kind: ObjectiveResultKind;
  /** measurement of result */
  measurement: Measurement;
  /** owner objective */
  objectiveId: Scalars['ID'];
  /** date that result is starting */
  startAt?: InputMaybe<Scalars['ISO8601Date']>;
  /** start value */
  startValue: Scalars['Float'];
  /** status of result */
  status: Status;
  /** target value */
  targetValue: Scalars['Float'];
  /** title of result */
  title: Scalars['String'];
};

/** result kind enum */
export enum ObjectiveResultKind {
  Initiative = 'initiative',
  KeyResult = 'key_result'
}

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

/** objective progress enum */
export enum Progress {
  Accomplished = 'accomplished',
  NeedsAttention = 'needs_attention',
  NoStatus = 'no_status',
  OffTrack = 'off_track',
  OnTrack = 'on_track'
}

/** Base Query Type */
export type Query = {
  __typename?: 'Query';
  /** retrieve contacts */
  contacts: ContactConnection;
  /** current user */
  me: User;
  /** retrieve objective */
  objective: Objective;
  /** retrieve activities */
  objectiveActivities: ObjectiveActivityConnection;
  /** retrieve activity */
  objectiveActivity: ObjectiveActivity;
  /** retrieve result */
  objectiveResult: ObjectiveResult;
  /** retrieve results */
  objectiveResults: ObjectiveResultConnection;
  /** retrieve objectives */
  objectives: ObjectiveConnection;
  /** retrieve team */
  team: Team;
  /** retrieve teams */
  teams: TeamConnection;
};


/** Base Query Type */
export type QueryContactsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Status>;
  teamId?: InputMaybe<Scalars['ID']>;
};


/** Base Query Type */
export type QueryObjectiveArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


/** Base Query Type */
export type QueryObjectiveActivitiesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  objectiveId?: InputMaybe<Array<Scalars['ID']>>;
  resultId?: InputMaybe<Array<Scalars['ID']>>;
  teamId?: InputMaybe<Array<Scalars['ID']>>;
};


/** Base Query Type */
export type QueryObjectiveActivityArgs = {
  id: Scalars['ID'];
};


/** Base Query Type */
export type QueryObjectiveResultArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


/** Base Query Type */
export type QueryObjectiveResultsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  objectiveId?: InputMaybe<Array<Scalars['ID']>>;
  teamId?: InputMaybe<Array<Scalars['ID']>>;
};


/** Base Query Type */
export type QueryObjectivesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Status>;
  teamId?: InputMaybe<Scalars['ID']>;
};


/** Base Query Type */
export type QueryTeamArgs = {
  id: Scalars['ID'];
};


/** Base Query Type */
export type QueryTeamsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Status>;
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
  contacts: ContactConnection;
  /** time record created */
  createdAt: Scalars['ISO8601DateTime'];
  /** record sub-type */
  definition: Scalars['String'];
  /** record unique identifier */
  id: Scalars['ID'];
  /** objectives this team has */
  objectives: Array<Objective>;
  /** optional parent record */
  parent?: Maybe<Team>;
  /** realms the team belongs to */
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


/** team with members in positions */
export type TeamContactsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
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
  /** total number of items */
  totalCount: Scalars['Int'];
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
  /** slug of account */
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
  /** time that token expires at */
  expiresAt?: Maybe<Scalars['ISO8601DateTime']>;
  /** token to use as Authorization header as: Bearer 'token' */
  token?: Maybe<Scalars['String']>;
  /** user if credentials are valid */
  user?: Maybe<User>;
};

export type UserLoginMutationVariables = Exact<{
  input: UserLoginMutationInput;
}>;


export type UserLoginMutation = { __typename?: 'Mutation', userLogin?: { __typename?: 'UserLoginMutationPayload', expiresAt?: string | null, apiToken?: string | null, user?: { __typename?: 'User', id: string, title: string, firstName?: string | null, lastName?: string | null, email?: string | null, phoneNumber?: string | null, remoteId?: string | null, avatar?: string | null, contacts: Array<{ __typename?: 'Contact', id: string }> } | null } | null };

export type TeamsQueryVariables = Exact<{ [key: string]: never; }>;


export type TeamsQuery = { __typename?: 'Query', teams: { __typename?: 'TeamConnection', nodes?: Array<(
      { __typename?: 'Team' }
      & { ' $fragmentRefs'?: { 'TeamListTeamFragmentFragment': TeamListTeamFragmentFragment } }
    ) | null> | null } };

export type NavigationTeamsQueryVariables = Exact<{ [key: string]: never; }>;


export type NavigationTeamsQuery = { __typename?: 'Query', teams: { __typename?: 'TeamConnection', nodes?: Array<{ __typename?: 'Team', id: string, title: string, slug: string } | null> | null } };

export type ObjectiveActivityCreateDialogResultFragmentFragment = { __typename?: 'ObjectiveResult', id: string, progress: Progress, measurement: Measurement, targetValue: number, currentValue?: number | null, startValue: number } & { ' $fragmentName'?: 'ObjectiveActivityCreateDialogResultFragmentFragment' };

export type ObjectiveActivityCreateMutationVariables = Exact<{
  input: ObjectiveActivityInput;
}>;


export type ObjectiveActivityCreateMutation = { __typename?: 'Mutation', objectiveActivityCreate?: { __typename?: 'ObjectiveActivityCreateMutationPayload', activity?: { __typename?: 'ObjectiveActivity', id: string, result: { __typename?: 'ObjectiveResult', id: string, progress: Progress, percentage: number, currentValue?: number | null, objective: { __typename?: 'Objective', id: string, progress: Progress, percentage: number } } } | null } | null };

export type TeamContactNamesQueryVariables = Exact<{ [key: string]: never; }>;


export type TeamContactNamesQuery = { __typename?: 'Query', teams: { __typename?: 'TeamConnection', nodes?: Array<{ __typename?: 'Team', id: string, title: string, definition: string, slug: string, contacts: { __typename?: 'ContactConnection', nodes?: Array<{ __typename?: 'Contact', id: string, title: string, slug: string } | null> | null } } | null> | null } };

export type ObjectiveCreateMutationVariables = Exact<{
  input: ObjectiveInput;
}>;


export type ObjectiveCreateMutation = { __typename?: 'Mutation', objectiveCreate?: { __typename?: 'ObjectiveCreateMutationPayload', objective?: { __typename?: 'Objective', id: string } | null } | null };

export type ObjectiveQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ObjectiveQuery = { __typename?: 'Query', objective: (
    { __typename?: 'Objective', createdAt: string, dueAt: string, id: string, status?: Status | null, title: string, updatedAt: string, progress: Progress, percentage: number, contact: { __typename?: 'Contact', id: string, avatar?: string | null, title: string }, team: { __typename?: 'Team', id: string, title: string } }
    & { ' $fragmentRefs'?: { 'ObjectiveResultListObjectiveFragmentFragment': ObjectiveResultListObjectiveFragmentFragment } }
  ) };

export type ObjectivesQueryVariables = Exact<{
  teamId?: InputMaybe<Scalars['ID']>;
  status?: InputMaybe<Status>;
}>;


export type ObjectivesQuery = { __typename?: 'Query', objectives: { __typename?: 'ObjectiveConnection', nodes?: Array<(
      { __typename?: 'Objective', id: string }
      & { ' $fragmentRefs'?: { 'ObjectiveListItemObjectiveFragmentFragment': ObjectiveListItemObjectiveFragmentFragment } }
    ) | null> | null }, me: { __typename?: 'User', id: string, contacts: Array<{ __typename?: 'Contact', id: string }> } };

export type ObjectiveListItemObjectiveFragmentFragment = { __typename?: 'Objective', createdAt: string, dueAt: string, id: string, status?: Status | null, title: string, updatedAt: string, percentage: number, progress: Progress, contact: { __typename?: 'Contact', id: string, avatar?: string | null, title: string } } & { ' $fragmentName'?: 'ObjectiveListItemObjectiveFragmentFragment' };

export type ObjectiveDeleteMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ObjectiveDeleteMutation = { __typename?: 'Mutation', objectiveDelete?: { __typename?: 'ObjectiveDeleteMutationPayload', id?: string | null } | null };

export type ObjectiveTeamContactNamesAndObjectivesQueryVariables = Exact<{
  objectiveId: Scalars['ID'];
}>;


export type ObjectiveTeamContactNamesAndObjectivesQuery = { __typename?: 'Query', objective: { __typename?: 'Objective', id: string, team: { __typename?: 'Team', id: string, contacts: { __typename?: 'ContactConnection', nodes?: Array<{ __typename?: 'Contact', id: string, title: string, slug: string } | null> | null }, objectives: Array<{ __typename?: 'Objective', id: string, title: string }> } } };

export type ObjectiveResultCreateMutationVariables = Exact<{
  input: ObjectiveResultInput;
}>;


export type ObjectiveResultCreateMutation = { __typename?: 'Mutation', objectiveResultCreate?: { __typename?: 'ObjectiveResultCreateMutationPayload', result?: { __typename?: 'ObjectiveResult', id: string } | null } | null };

export type ObjectiveResultListObjectiveFragmentFragment = { __typename?: 'Objective', id: string, contact: { __typename?: 'Contact', id: string } } & { ' $fragmentName'?: 'ObjectiveResultListObjectiveFragmentFragment' };

export type ObjectiveResultsQueryVariables = Exact<{
  objectiveId?: InputMaybe<Array<Scalars['ID']> | Scalars['ID']>;
}>;


export type ObjectiveResultsQuery = { __typename?: 'Query', objectiveResults: { __typename?: 'ObjectiveResultConnection', nodes?: Array<(
      { __typename?: 'ObjectiveResult', id: string }
      & { ' $fragmentRefs'?: { 'ObjectiveResultListItemObjectiveResultFragmentFragment': ObjectiveResultListItemObjectiveResultFragmentFragment } }
    ) | null> | null } };

export type ObjectiveResultListItemObjectiveResultFragmentFragment = (
  { __typename?: 'ObjectiveResult', createdAt: string, dueAt?: string | null, id: string, status: Status, title: string, updatedAt: string, percentage: number, progress: Progress, kind: ObjectiveResultKind, contact: { __typename?: 'Contact', id: string, avatar?: string | null, title: string }, objective: { __typename?: 'Objective', id: string } }
  & { ' $fragmentRefs'?: { 'ObjectiveActivityCreateDialogResultFragmentFragment': ObjectiveActivityCreateDialogResultFragmentFragment } }
) & { ' $fragmentName'?: 'ObjectiveResultListItemObjectiveResultFragmentFragment' };

export type ObjectiveResultDeleteMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ObjectiveResultDeleteMutation = { __typename?: 'Mutation', objectiveResultDelete?: { __typename?: 'ObjectiveResultDeleteMutationPayload', id?: string | null } | null };

export type MembersQueryVariables = Exact<{
  teamId: Scalars['ID'];
}>;


export type MembersQuery = { __typename?: 'Query', contacts: { __typename?: 'ContactConnection', nodes?: Array<{ __typename?: 'Contact', id: string, avatar?: string | null, firstName?: string | null, lastName?: string | null, title: string } | null> | null } };

export type TeamQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type TeamQuery = { __typename?: 'Query', team: { __typename?: 'Team', id: string, title: string, contacts: { __typename?: 'ContactConnection', nodes?: Array<{ __typename?: 'Contact', id: string, avatar?: string | null, firstName?: string | null, lastName?: string | null, title: string } | null> | null } } };

export type TeamListTeamFragmentFragment = (
  { __typename?: 'Team', id: string, title: string, status?: Status | null, definition: string }
  & { ' $fragmentRefs'?: { 'TeamListItemTeamFragmentFragment': TeamListItemTeamFragmentFragment } }
) & { ' $fragmentName'?: 'TeamListTeamFragmentFragment' };

export type TeamListItemTeamFragmentFragment = { __typename?: 'Team', id: string, title: string, slug: string, contacts: { __typename?: 'ContactConnection', totalCount: number, nodes?: Array<{ __typename?: 'Contact', id: string, title: string, avatar?: string | null, status?: Status | null } | null> | null } } & { ' $fragmentName'?: 'TeamListItemTeamFragmentFragment' };

export const ObjectiveListItemObjectiveFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ObjectiveListItemObjectiveFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Objective"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contact"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"dueAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"percentage"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}}]}}]} as unknown as DocumentNode<ObjectiveListItemObjectiveFragmentFragment, unknown>;
export const ObjectiveResultListObjectiveFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ObjectiveResultListObjectiveFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Objective"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"contact"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<ObjectiveResultListObjectiveFragmentFragment, unknown>;
export const ObjectiveActivityCreateDialogResultFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ObjectiveActivityCreateDialogResultFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ObjectiveResult"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"Field","name":{"kind":"Name","value":"measurement"}},{"kind":"Field","name":{"kind":"Name","value":"targetValue"}},{"kind":"Field","name":{"kind":"Name","value":"currentValue"}},{"kind":"Field","name":{"kind":"Name","value":"startValue"}}]}}]} as unknown as DocumentNode<ObjectiveActivityCreateDialogResultFragmentFragment, unknown>;
export const ObjectiveResultListItemObjectiveResultFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ObjectiveResultListItemObjectiveResultFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ObjectiveResult"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contact"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"dueAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"percentage"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"Field","name":{"kind":"Name","value":"kind"}},{"kind":"Field","name":{"kind":"Name","value":"objective"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ObjectiveActivityCreateDialogResultFragment"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ObjectiveActivityCreateDialogResultFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ObjectiveResult"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"Field","name":{"kind":"Name","value":"measurement"}},{"kind":"Field","name":{"kind":"Name","value":"targetValue"}},{"kind":"Field","name":{"kind":"Name","value":"currentValue"}},{"kind":"Field","name":{"kind":"Name","value":"startValue"}}]}}]} as unknown as DocumentNode<ObjectiveResultListItemObjectiveResultFragmentFragment, unknown>;
export const TeamListItemTeamFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TeamListItemTeamFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Team"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"contacts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"4"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<TeamListItemTeamFragmentFragment, unknown>;
export const TeamListTeamFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TeamListTeamFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Team"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"definition"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"TeamListItemTeamFragment"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TeamListItemTeamFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Team"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"contacts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"4"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<TeamListTeamFragmentFragment, unknown>;
export const UserLoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UserLogin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserLoginMutationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userLogin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"apiToken"},"name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"remoteId"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"contacts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UserLoginMutation, UserLoginMutationVariables>;
export const TeamsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Teams"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teams"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"EnumValue","value":"active"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TeamListTeamFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TeamListItemTeamFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Team"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"contacts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"4"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TeamListTeamFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Team"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"definition"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"TeamListItemTeamFragment"}}]}}]} as unknown as DocumentNode<TeamsQuery, TeamsQueryVariables>;
export const NavigationTeamsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"NavigationTeams"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teams"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"EnumValue","value":"active"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]}}]} as unknown as DocumentNode<NavigationTeamsQuery, NavigationTeamsQueryVariables>;
export const ObjectiveActivityCreateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ObjectiveActivityCreate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ObjectiveActivityInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"objectiveActivityCreate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"activity"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"activity"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"result"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"Field","name":{"kind":"Name","value":"percentage"}},{"kind":"Field","name":{"kind":"Name","value":"currentValue"}},{"kind":"Field","name":{"kind":"Name","value":"objective"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"Field","name":{"kind":"Name","value":"percentage"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<ObjectiveActivityCreateMutation, ObjectiveActivityCreateMutationVariables>;
export const TeamContactNamesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TeamContactNames"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teams"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"EnumValue","value":"active"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"definition"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"contacts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<TeamContactNamesQuery, TeamContactNamesQueryVariables>;
export const ObjectiveCreateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ObjectiveCreate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ObjectiveInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"objectiveCreate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"objective"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"objective"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<ObjectiveCreateMutation, ObjectiveCreateMutationVariables>;
export const ObjectiveDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Objective"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"objective"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contact"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"dueAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"Field","name":{"kind":"Name","value":"percentage"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ObjectiveResultListObjectiveFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ObjectiveResultListObjectiveFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Objective"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"contact"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<ObjectiveQuery, ObjectiveQueryVariables>;
export const ObjectivesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Objectives"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Status"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"objectives"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}}},{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ObjectiveListItemObjectiveFragment"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"contacts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ObjectiveListItemObjectiveFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Objective"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contact"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"dueAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"percentage"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}}]}}]} as unknown as DocumentNode<ObjectivesQuery, ObjectivesQueryVariables>;
export const ObjectiveDeleteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ObjectiveDelete"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"objectiveDelete"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<ObjectiveDeleteMutation, ObjectiveDeleteMutationVariables>;
export const ObjectiveTeamContactNamesAndObjectivesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ObjectiveTeamContactNamesAndObjectives"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"objectiveId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"objective"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"objectiveId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"contacts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"objectives"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ObjectiveTeamContactNamesAndObjectivesQuery, ObjectiveTeamContactNamesAndObjectivesQueryVariables>;
export const ObjectiveResultCreateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ObjectiveResultCreate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ObjectiveResultInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"objectiveResultCreate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"result"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"result"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<ObjectiveResultCreateMutation, ObjectiveResultCreateMutationVariables>;
export const ObjectiveResultsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ObjectiveResults"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"objectiveId"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"objectiveResults"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objectiveId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"objectiveId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ObjectiveResultListItemObjectiveResultFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ObjectiveActivityCreateDialogResultFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ObjectiveResult"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"Field","name":{"kind":"Name","value":"measurement"}},{"kind":"Field","name":{"kind":"Name","value":"targetValue"}},{"kind":"Field","name":{"kind":"Name","value":"currentValue"}},{"kind":"Field","name":{"kind":"Name","value":"startValue"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ObjectiveResultListItemObjectiveResultFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ObjectiveResult"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contact"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"dueAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"percentage"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"Field","name":{"kind":"Name","value":"kind"}},{"kind":"Field","name":{"kind":"Name","value":"objective"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ObjectiveActivityCreateDialogResultFragment"}}]}}]} as unknown as DocumentNode<ObjectiveResultsQuery, ObjectiveResultsQueryVariables>;
export const ObjectiveResultDeleteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ObjectiveResultDelete"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"objectiveResultDelete"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<ObjectiveResultDeleteMutation, ObjectiveResultDeleteMutationVariables>;
export const MembersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Members"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contacts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]} as unknown as DocumentNode<MembersQuery, MembersQueryVariables>;
export const TeamDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Team"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"team"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"contacts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]}}]} as unknown as DocumentNode<TeamQuery, TeamQueryVariables>;

export const MeasurementSchema = yup.string<Measurement>().oneOf([Measurement.Currency, Measurement.Numerical, Measurement.Percentage]).defined();

export function ObjectiveActivityCreateMutationInputSchema(): yup.ObjectSchema<ObjectiveActivityCreateMutationInput> {
  return yup.object({
    activity: yup.lazy(() => ObjectiveActivityInputSchema().nonNullable()),
    clientMutationId: yup.string().defined().nullable().optional()
  })
}

export function ObjectiveActivityInputSchema(): yup.ObjectSchema<ObjectiveActivityInput> {
  return yup.object({
    comment: yup.string().defined().nullable().optional(),
    contactId: yup.string().defined().nonNullable(),
    currentValue: yup.number().defined().nullable().optional(),
    kind: ObjectiveActivityKindSchema.nonNullable(),
    objectiveId: yup.string().defined().nonNullable(),
    progress: ProgressSchema.nullable().optional(),
    resultId: yup.string().defined().nullable().optional()
  })
}

export const ObjectiveActivityKindSchema = yup.string<ObjectiveActivityKind>().oneOf([ObjectiveActivityKind.Note, ObjectiveActivityKind.ProgressUpdate]).defined();

export function ObjectiveCreateMutationInputSchema(): yup.ObjectSchema<ObjectiveCreateMutationInput> {
  return yup.object({
    clientMutationId: yup.string().defined().nullable().optional(),
    objective: yup.lazy(() => ObjectiveInputSchema().nonNullable())
  })
}

export function ObjectiveDeleteMutationInputSchema(): yup.ObjectSchema<ObjectiveDeleteMutationInput> {
  return yup.object({
    clientMutationId: yup.string().defined().nullable().optional(),
    id: yup.string().defined().nonNullable()
  })
}

export function ObjectiveInputSchema(): yup.ObjectSchema<ObjectiveInput> {
  return yup.object({
    contactId: yup.string().defined().nonNullable(),
    description: yup.string().defined().nullable().optional(),
    dueAt: yup.string().defined().nonNullable(),
    status: StatusSchema.nonNullable(),
    teamId: yup.string().defined().nonNullable(),
    title: yup.string().defined().nonNullable()
  })
}

export function ObjectiveResultCreateMutationInputSchema(): yup.ObjectSchema<ObjectiveResultCreateMutationInput> {
  return yup.object({
    clientMutationId: yup.string().defined().nullable().optional(),
    result: yup.lazy(() => ObjectiveResultInputSchema().nonNullable())
  })
}

export function ObjectiveResultDeleteMutationInputSchema(): yup.ObjectSchema<ObjectiveResultDeleteMutationInput> {
  return yup.object({
    clientMutationId: yup.string().defined().nullable().optional(),
    id: yup.string().defined().nonNullable()
  })
}

export function ObjectiveResultInputSchema(): yup.ObjectSchema<ObjectiveResultInput> {
  return yup.object({
    contactId: yup.string().defined().nonNullable(),
    description: yup.string().defined().nullable().optional(),
    dueAt: yup.string().defined().nullable().optional(),
    kind: ObjectiveResultKindSchema.nonNullable(),
    measurement: MeasurementSchema.nonNullable(),
    objectiveId: yup.string().defined().nonNullable(),
    startAt: yup.string().defined().nullable().optional(),
    startValue: yup.number().defined().nonNullable(),
    status: StatusSchema.nonNullable(),
    targetValue: yup.number().defined().nonNullable(),
    title: yup.string().defined().nonNullable()
  })
}

export const ObjectiveResultKindSchema = yup.string<ObjectiveResultKind>().oneOf([ObjectiveResultKind.Initiative, ObjectiveResultKind.KeyResult]).defined();

export const ProgressSchema = yup.string<Progress>().oneOf([Progress.Accomplished, Progress.NeedsAttention, Progress.NoStatus, Progress.OffTrack, Progress.OnTrack]).defined();

export const StatusSchema = yup.string<Status>().oneOf([Status.Active, Status.Archived, Status.Draft]).defined();

export function UserCredentialsInputSchema(): yup.ObjectSchema<UserCredentialsInput> {
  return yup.object({
    password: yup.string().defined().nonNullable(),
    username: yup.string().defined().nonNullable()
  })
}

export function UserLoginMutationInputSchema(): yup.ObjectSchema<UserLoginMutationInput> {
  return yup.object({
    accountSlug: yup.string().defined().nonNullable(),
    clientMutationId: yup.string().defined().nullable().optional(),
    credentials: yup.lazy(() => UserCredentialsInputSchema().nonNullable())
  })
}
