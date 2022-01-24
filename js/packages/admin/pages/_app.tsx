import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from 'src/components/theme';
import createEmotionCache from 'src/components/createEmotionCache';
import QueryProvider from 'src/query/QueryProvider';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { TOKEN } from 'src/gql/queries/users';
import { ApolloProvider } from '@apollo/react-hooks';
import { setContext } from '@apollo/client/link/context';


// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}
const httpLink = createHttpLink({
  uri: "/graphql/query"
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem(TOKEN);
  console.log(token)
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    resolvers: {
      Query: {
        isLoggedIn() {
          return !!localStorage.getItem(TOKEN);
        }
      },
      Mutation: {
        setToken(_, { token }) {
          localStorage.setItem(TOKEN, token);
        }
      }
    }
  });

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Drop Society</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ApolloProvider client={client}>
        <QueryProvider>
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline/>
              <Component {...pageProps} />
            </ThemeProvider>
          </StyledEngineProvider>
        </QueryProvider>
      </ApolloProvider>
    </CacheProvider>
  );
}
