import {
  ApolloClient,
  InMemoryCache,
  type NormalizedCacheObject,
  createHttpLink,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

export default function useApolloClient(
  apiToken?: string | null
): ApolloClient<NormalizedCacheObject> {
  const httpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_API_URL,
  })

  const authLink = setContext((_, { headers }) => {
    if (apiToken == null) return { headers }
    return {
      headers: {
        ...headers,
        Authorization: `Bearer ${apiToken}`,
      },
    }
  })
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    connectToDevTools: true,
  })
  return client
}
