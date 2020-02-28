import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import {
  InMemoryCache,
  IntrospectionFragmentMatcher
} from "apollo-cache-inmemory";

class Apollo {
  constructor(uri, options) {
    const fragmentMatcher = new IntrospectionFragmentMatcher({
      introspectionQueryResultData: {
        __schema: {
          types: []
        }
      }
    });

    let link = null;
    let cache = null;
    let client = null;

    try {
      cache = new InMemoryCache({ fragmentMatcher });
    } catch {
      throw new Error("An error occurred when initializing cache!");
    }

    try {
      link = new HttpLink({
        uri,
        headers: options.headers
      });
    } catch {
      throw new Error("An error occurred when initializing the API link!");
    }

    try {
      client = new ApolloClient({
        cache,
        link
      });
    } catch {
      throw new Error("An error occurred when initializing headers!");
    }

    this.send = (query, variables) => {
      return client.query({
        errorPolicy: "ignore",
        query,
        variables
      });
    };
  }
}

export { Apollo };
