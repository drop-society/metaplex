import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ApolloProvider } from '@apollo/react-hooks';
import { CacheProvider, EmotionCache } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import { AppProps } from 'next/app';
import Head from 'next/head';
import * as React from 'react';
import createEmotionCache from 'src/components/createEmotionCache';
import theme from 'src/components/theme';
import { TOKEN } from 'src/gql/queries/users';
import QueryProvider from 'src/query/QueryProvider';


// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}
const httpLink = createHttpLink({
  uri: "/query"
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem(TOKEN);
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
        logOut() {
          return localStorage.removeItem(TOKEN)
        },
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
