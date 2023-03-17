import { ListItem } from "@/components/ToDo";
import { client } from "@/server/apolloClient";
import { gql } from "@apollo/client";
import { GetServerSideProps, NextPage } from "next";
import { useState } from "react";

interface HomeProps {
  users: User[];
}

type User = {
  name: string;
  email: string;
  image: string;
  tasks: Task[];
};

type Task = {
  id: number;
  task: string;
  userId?: number;
  finished: boolean;
};

export const Home: NextPage<HomeProps> = (props) => {
  const [users, setUsers] = useState<User[]>(() => props.users);
  console.log(props);

  function test() {
    console.log("I worked");
  }

  function updateUsers(data: any) {}

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl mx-auto max-w-5xl my-10">
      <h1 className="text-4xl font-bold pb-2 text-center mb-2">GraphQL ToDo</h1>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Teste
            </th>

            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user: User, index) => (
            <ListItem
              key={index}
              data={user.name}
              update={test}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await client.query({
    query: gql`
      query Users {
        users {
          name
          image
          email
          tasks {
            userId
            task
            id
          }
        }
      }
    `,
  });

  return {
    props: {
      users: data.users,
    },
  };
};
export default Home;
