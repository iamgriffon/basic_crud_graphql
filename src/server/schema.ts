import { gql } from "apollo-server-micro";

export const typeDefs = gql`

  type Task {
    id: Int,
    task: String,
    userId: Int,
    finished: Boolean
  }

  type User {
      id: Int
      name: String,
      email: String,
      image: String,
      tasks: [Task]
    }

    type Query {
      user(email: String): User
      users: [User]
      tasks(email: String): [Task]
    }

    type Mutation {
      addUser(email: String, name: String, image: String): [User]
      updateUser(email: String, name: String, image: String): [User]
      deleteUser(email: String, name: String, image: String): [User]
      addTask(email: String, task: String): [Task]
      deleteTask(email: String, taskId: Int): [Task]
      finishTask(email: String, task: String, taskId: Int): [Task]
      updateTask(email: String, task: String, taskId: Int): [Task]
    }
`;
