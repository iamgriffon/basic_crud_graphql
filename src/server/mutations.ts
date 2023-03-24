import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation AddUser($email: String, $name: String, $image: String) {
    addUser(email: $email, name: $name, image: $image) {
      id
      name
      email
      image
    }
  }
`;
