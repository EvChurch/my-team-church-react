/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n            mutation UserLogin($input: UserLoginMutationInput!) {\n              userLogin(input: $input) {\n                apiToken: token\n                expiresAt\n                user {\n                  id\n                  title\n                  firstName\n                  lastName\n                  email\n                  phoneNumber\n                  remoteId\n                  avatar\n                }\n              }\n            }\n          ": types.UserLoginDocument,
    "\n  query Teams {\n    teams {\n      nodes {\n        ...TeamListTeamFragment\n      }\n    }\n  }\n": types.TeamsDocument,
    "\n  query TeamContactNames {\n    teams(status: active) {\n      nodes {\n        id\n        title\n        definition\n        slug\n        contacts {\n          id\n          title\n          avatar\n          slug\n        }\n      }\n    }\n  }\n": types.TeamContactNamesDocument,
    "\n  mutation ObjectiveCreate($input: ObjectiveInput!) {\n    objectiveCreate(input: { objective: $input }) {\n      objective {\n        id\n      }\n    }\n  }\n": types.ObjectiveCreateDocument,
    "\n  query Objective($id: ID!) {\n    objective(id: $id) {\n      contact {\n        id\n        avatar\n        title\n      }\n      team {\n        id\n        title\n      }\n      createdAt\n      dueAt\n      id\n      status\n      title\n      updatedAt\n      progress\n      percentage\n    }\n  }\n": types.ObjectiveDocument,
    "\n  query Objectives($teamId: ID, $status: Status) {\n    objectives(teamId: $teamId, status: $status) {\n      nodes {\n        id\n        ...ObjectiveListItemObjectiveFragment\n      }\n    }\n    me {\n      id\n      contacts {\n        id\n      }\n    }\n  }\n": types.ObjectivesDocument,
    "\n  fragment ObjectiveListItemObjectiveFragment on Objective {\n    contact {\n      id\n      avatar\n      title\n    }\n    createdAt\n    dueAt\n    id\n    status\n    title\n    updatedAt\n    percentage\n    progress\n  }\n": types.ObjectiveListItemObjectiveFragmentFragmentDoc,
    "\n  query ObjectiveTeamContactNamesAndObjectives($objectiveId: ID!) {\n    objective(id: $objectiveId) {\n      id\n      team {\n        id\n        contacts {\n          id\n          title\n          avatar\n          slug\n        }\n        objectives {\n          id\n          title\n        }\n      }\n    }\n  }\n": types.ObjectiveTeamContactNamesAndObjectivesDocument,
    "\n  mutation ObjectiveResultCreate($input: ObjectiveResultInput!) {\n    objectiveResultCreate(input: { result: $input }) {\n      result {\n        id\n      }\n    }\n  }\n": types.ObjectiveResultCreateDocument,
    "\n  query ObjectiveResults($objectiveId: [ID!]) {\n    objectiveResults(objectiveId: $objectiveId) {\n      nodes {\n        id\n        ...ObjectiveResultListItemObjectiveResultFragment\n      }\n    }\n  }\n": types.ObjectiveResultsDocument,
    "\n  fragment ObjectiveResultListItemObjectiveResultFragment on ObjectiveResult {\n    contact {\n      id\n      avatar\n      title\n    }\n    createdAt\n    dueAt\n    id\n    status\n    title\n    updatedAt\n    percentage\n    progress\n    kind\n  }\n": types.ObjectiveResultListItemObjectiveResultFragmentFragmentDoc,
    "\n  query Members($teamId: ID!) {\n    contacts(teamId: $teamId) {\n      nodes {\n        id\n        avatar\n        firstName\n        lastName\n        title\n      }\n    }\n  }\n": types.MembersDocument,
    "\n  query Team($id: ID!) {\n    team(id: $id) {\n      id\n      title\n      contacts {\n        id\n        avatar\n        firstName\n        lastName\n        title\n      }\n    }\n  }\n": types.TeamDocument,
    "\n  fragment TeamListTeamFragment on Team {\n    id\n    title\n    status\n    definition\n    ...TeamListItemTeamFragment\n  }\n": types.TeamListTeamFragmentFragmentDoc,
    "\n  fragment TeamListItemTeamFragment on Team {\n    id\n    title\n    slug\n    contacts {\n      id\n      title\n      avatar\n      status\n    }\n  }\n": types.TeamListItemTeamFragmentFragmentDoc,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n            mutation UserLogin($input: UserLoginMutationInput!) {\n              userLogin(input: $input) {\n                apiToken: token\n                expiresAt\n                user {\n                  id\n                  title\n                  firstName\n                  lastName\n                  email\n                  phoneNumber\n                  remoteId\n                  avatar\n                }\n              }\n            }\n          "): (typeof documents)["\n            mutation UserLogin($input: UserLoginMutationInput!) {\n              userLogin(input: $input) {\n                apiToken: token\n                expiresAt\n                user {\n                  id\n                  title\n                  firstName\n                  lastName\n                  email\n                  phoneNumber\n                  remoteId\n                  avatar\n                }\n              }\n            }\n          "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Teams {\n    teams {\n      nodes {\n        ...TeamListTeamFragment\n      }\n    }\n  }\n"): (typeof documents)["\n  query Teams {\n    teams {\n      nodes {\n        ...TeamListTeamFragment\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TeamContactNames {\n    teams(status: active) {\n      nodes {\n        id\n        title\n        definition\n        slug\n        contacts {\n          id\n          title\n          avatar\n          slug\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query TeamContactNames {\n    teams(status: active) {\n      nodes {\n        id\n        title\n        definition\n        slug\n        contacts {\n          id\n          title\n          avatar\n          slug\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ObjectiveCreate($input: ObjectiveInput!) {\n    objectiveCreate(input: { objective: $input }) {\n      objective {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation ObjectiveCreate($input: ObjectiveInput!) {\n    objectiveCreate(input: { objective: $input }) {\n      objective {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Objective($id: ID!) {\n    objective(id: $id) {\n      contact {\n        id\n        avatar\n        title\n      }\n      team {\n        id\n        title\n      }\n      createdAt\n      dueAt\n      id\n      status\n      title\n      updatedAt\n      progress\n      percentage\n    }\n  }\n"): (typeof documents)["\n  query Objective($id: ID!) {\n    objective(id: $id) {\n      contact {\n        id\n        avatar\n        title\n      }\n      team {\n        id\n        title\n      }\n      createdAt\n      dueAt\n      id\n      status\n      title\n      updatedAt\n      progress\n      percentage\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Objectives($teamId: ID, $status: Status) {\n    objectives(teamId: $teamId, status: $status) {\n      nodes {\n        id\n        ...ObjectiveListItemObjectiveFragment\n      }\n    }\n    me {\n      id\n      contacts {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  query Objectives($teamId: ID, $status: Status) {\n    objectives(teamId: $teamId, status: $status) {\n      nodes {\n        id\n        ...ObjectiveListItemObjectiveFragment\n      }\n    }\n    me {\n      id\n      contacts {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ObjectiveListItemObjectiveFragment on Objective {\n    contact {\n      id\n      avatar\n      title\n    }\n    createdAt\n    dueAt\n    id\n    status\n    title\n    updatedAt\n    percentage\n    progress\n  }\n"): (typeof documents)["\n  fragment ObjectiveListItemObjectiveFragment on Objective {\n    contact {\n      id\n      avatar\n      title\n    }\n    createdAt\n    dueAt\n    id\n    status\n    title\n    updatedAt\n    percentage\n    progress\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ObjectiveTeamContactNamesAndObjectives($objectiveId: ID!) {\n    objective(id: $objectiveId) {\n      id\n      team {\n        id\n        contacts {\n          id\n          title\n          avatar\n          slug\n        }\n        objectives {\n          id\n          title\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query ObjectiveTeamContactNamesAndObjectives($objectiveId: ID!) {\n    objective(id: $objectiveId) {\n      id\n      team {\n        id\n        contacts {\n          id\n          title\n          avatar\n          slug\n        }\n        objectives {\n          id\n          title\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ObjectiveResultCreate($input: ObjectiveResultInput!) {\n    objectiveResultCreate(input: { result: $input }) {\n      result {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation ObjectiveResultCreate($input: ObjectiveResultInput!) {\n    objectiveResultCreate(input: { result: $input }) {\n      result {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ObjectiveResults($objectiveId: [ID!]) {\n    objectiveResults(objectiveId: $objectiveId) {\n      nodes {\n        id\n        ...ObjectiveResultListItemObjectiveResultFragment\n      }\n    }\n  }\n"): (typeof documents)["\n  query ObjectiveResults($objectiveId: [ID!]) {\n    objectiveResults(objectiveId: $objectiveId) {\n      nodes {\n        id\n        ...ObjectiveResultListItemObjectiveResultFragment\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ObjectiveResultListItemObjectiveResultFragment on ObjectiveResult {\n    contact {\n      id\n      avatar\n      title\n    }\n    createdAt\n    dueAt\n    id\n    status\n    title\n    updatedAt\n    percentage\n    progress\n    kind\n  }\n"): (typeof documents)["\n  fragment ObjectiveResultListItemObjectiveResultFragment on ObjectiveResult {\n    contact {\n      id\n      avatar\n      title\n    }\n    createdAt\n    dueAt\n    id\n    status\n    title\n    updatedAt\n    percentage\n    progress\n    kind\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Members($teamId: ID!) {\n    contacts(teamId: $teamId) {\n      nodes {\n        id\n        avatar\n        firstName\n        lastName\n        title\n      }\n    }\n  }\n"): (typeof documents)["\n  query Members($teamId: ID!) {\n    contacts(teamId: $teamId) {\n      nodes {\n        id\n        avatar\n        firstName\n        lastName\n        title\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Team($id: ID!) {\n    team(id: $id) {\n      id\n      title\n      contacts {\n        id\n        avatar\n        firstName\n        lastName\n        title\n      }\n    }\n  }\n"): (typeof documents)["\n  query Team($id: ID!) {\n    team(id: $id) {\n      id\n      title\n      contacts {\n        id\n        avatar\n        firstName\n        lastName\n        title\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment TeamListTeamFragment on Team {\n    id\n    title\n    status\n    definition\n    ...TeamListItemTeamFragment\n  }\n"): (typeof documents)["\n  fragment TeamListTeamFragment on Team {\n    id\n    title\n    status\n    definition\n    ...TeamListItemTeamFragment\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment TeamListItemTeamFragment on Team {\n    id\n    title\n    slug\n    contacts {\n      id\n      title\n      avatar\n      status\n    }\n  }\n"): (typeof documents)["\n  fragment TeamListItemTeamFragment on Team {\n    id\n    title\n    slug\n    contacts {\n      id\n      title\n      avatar\n      status\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;