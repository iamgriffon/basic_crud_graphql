import { gql } from "apollo-server-micro";

export const typeDefs = gql`

  type Task {
    id: Int!,
    task: String,
    userId: ID
  }

  type User {
      id: Int!
      name: String,
      email: String,
      password: String,
      image: String,
      tasks: [Task]!
    }

    type Query {
      user: User
    }
`;
