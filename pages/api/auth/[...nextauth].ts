import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import NextAuth, { type NextAuthOptions, type User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import { type UserLoginMutation } from '../../../src/gql/graphql'

export const authOptions: NextAuthOptions = {
  debug: true,
  jwt: {
    maxAge: 60 * 60 * 24 * 30,
  },
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: 'Username' },
        password: { label: 'Password', type: 'password' },
        accountSlug: { label: 'Account ID' },
      },
      async authorize(credentials) {
        const client = new ApolloClient({
          uri: process.env.NEXT_PUBLIC_API_URL,
          cache: new InMemoryCache(),
          connectToDevTools: true,
        })
        const response = await client.mutate<UserLoginMutation>({
          mutation: gql`
            mutation UserLogin($input: UserLoginMutationInput!) {
              userLogin(input: $input) {
                apiToken: token
                expiresAt
                user {
                  id
                  title
                  firstName
                  lastName
                  email
                  phoneNumber
                  remoteId
                  avatar
                  contacts {
                    id
                  }
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
        if (response.data?.userLogin?.user != null) {
          return {
            ...response.data?.userLogin?.user,
            apiToken: response.data?.userLogin?.apiToken,
          }
        }
        return null
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
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
