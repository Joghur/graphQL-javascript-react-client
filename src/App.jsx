import {
  ApolloClient,
  ApolloProvider,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
// eslint-disable-next-line import/named
import { Routing } from './Routing';
import { GRAPHQL_SERVER_URL } from './constants';
import packageJson from '../package.json';
import { dateEpochToDateString } from './utils/dates';
import withClearCache from './ClearCache';

function MainApp() {
  const httpLink = new HttpLink({
    uri: GRAPHQL_SERVER_URL,
  });

  const authLink = new ApolloLink((operation, forward) => {
    // Use the setContext method to set the HTTP headers.
    operation.setContext({});

    // Call the next link in the middleware chain.
    return forward(operation);
  });

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
  });

  return (
    <div>
      <ApolloProvider client={client}>
        <Routing
          buildDate={dateEpochToDateString(
            packageJson.buildDate,
            'D/M-Y HH:mm',
          )}
        />
      </ApolloProvider>
    </div>
  );
}

// ClearCache makes sure that browser clears cache if build is newer than cached
const ClearCacheComponent = withClearCache(MainApp);

function App() {
  return <ClearCacheComponent />;
}

export default App;
