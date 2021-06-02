import {
  ApolloClient,
  ApolloProvider,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
// import { useRecoilValue } from 'recoil';
// eslint-disable-next-line import/named
import { Routing } from './Routing';
// import { SERVER_URL } from './constants';
// import { tokenState } from './Recoil';
import packageJson from '../package.json';
import { dateEpochToDateString } from './utils/dates';
import withClearCache from './ClearCache';

function MainApp() {
  // const token = useRecoilValue(tokenState);

  const httpLink = new HttpLink({
    uri: `localhost:4000/graphql`,
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

const ClearCacheComponent = withClearCache(MainApp);

function App() {
  return <ClearCacheComponent />;
}

export default App;
