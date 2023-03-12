import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import NextAuth, { type NextAuthOptions, type User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import { type UserLoginMutation } from '../../../src/gql/graphql'

export const authOptions: NextAuthOptions = {
  debug: true,
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: 'Username' },
        password: { label: 'Password', type: 'password' },
        accountSlug: { label: 'Account ID' },
      },
      async authorize(credentials) {
        const client = new ApolloClient({
          uri: 'http://localhost:5000/graphql',
          cache: new InMemoryCache(),
        })
        const response = await client.mutate<UserLoginMutation>({
          mutation: gql`
            mutation UserLogin($input: UserLoginMutationInput!) {
              userLogin(input: $input) {
                apiToken: token
                user {
                  id
                  title
                  firstName
                  lastName
                  email
                  phoneNumber
                  remoteId
                }
              }
            }
          `,
          variables: {
            input: {
              credentials: {
                username: credentials?.username,
                password: credentials?.password,
              },
              accountSlug: credentials?.accountSlug,
            },
          },
        })
        return response.data?.userLogin?.user ?? null
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/logout',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user != null) token.user = user
      return token
    },
    async session({ session, token }) {
      session.user = token.user as User

      return session
    },
  },
}

export default NextAuth(authOptions)
