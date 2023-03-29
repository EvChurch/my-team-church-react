// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from 'next-auth'

import { type UserLoginMutation } from './src/gql/graphql'

type GraphUser = NonNullable<
  NonNullable<UserLoginMutation['userLogin']>['user']
> & {
  apiToken?: string | null
}
declare module 'next-auth' {
  /**
   * The shape of the returned object in the OAuth providers' `profile` callback,
   * available in the `jwt` and `session` callbacks,
   * or the second parameter of the `session` callback, when using a database.
   *
   * [`signIn` callback](https://next-auth.js.org/configuration/callbacks#sign-in-callback) |
   * [`session` callback](https://next-auth.js.org/configuration/callbacks#jwt-callback) |
   * [`jwt` callback](https://next-auth.js.org/configuration/callbacks#jwt-callback) |
   * [`profile` OAuth provider callback](https://next-auth.js.org/configuration/providers#using-a-custom-provider)
   */
  interface User extends GraphUser {}

  /**
   * Returned by `useSession`, `getSession`, returned by the `session` callback
   * and also the shape received as a prop on the `SessionProvider` React Context
   *
   * [`useSession`](https://next-auth.js.org/getting-started/client#usesession) |
   * [`getSession`](https://next-auth.js.org/getting-started/client#getsession) |
   * [`SessionProvider`](https://next-auth.js.org/getting-started/client#sessionprovider) |
   * [`session` callback](https://next-auth.js.org/configuration/callbacks#jwt-callback)
   */
  interface Session {
    user: GraphUser
  }
}
