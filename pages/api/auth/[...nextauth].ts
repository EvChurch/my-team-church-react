import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

export default NextAuth({
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
        try {
          const response = await client.mutate({
            mutation: gql`
              mutation ($input: UserLoginMutationInput!) {
                userLogin(input: $input) {
                  token
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

          if (!response.data) {
            return null
          }

          const user = response.data

          return user
        } catch (error) {
          console.log(error)
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/logout',
    error: '/auth/error',
  },
})
