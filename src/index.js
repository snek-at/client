import { Apollo } from "./apollo";

class Graphql {
  constructor(uri, options) {
    let apollo = new Apollo(uri, options);

    this.send = async (query, variables) => {
      let response = await apollo.send(query, variables);
      return response;
    };
  }
}

export { Graphql };
