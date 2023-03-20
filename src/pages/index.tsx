import { THeader } from "@/components/table/THead";
import { Task } from "@/components/TableTask";
import { TableUser } from "@/components/TableUser";
import { useUsers } from "@/context/userContext";
import { client } from "@/server/apolloClient";
import { User } from "@/types/app";
import { gql } from "@apollo/client";
import { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";

interface HomeProps {
  users: User[];
}

async function fetchUsers(){
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
  return data
}

export const Home: NextPage<HomeProps> = (props) => {
  console.log(props);
  const { users, fetchUsers, updateUsers } = useUsers();

  useEffect(() => {
    updateUsers(props.users)
  },[]);
  
  function test() {
    console.log("I worked");
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl mx-auto max-w-5xl my-10">
      <h1 className="text-4xl font-bold pb-2 text-center mb-2">GraphQL ToDo</h1>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <THeader data="Name" align="left" />
            <THeader data="Email" align="left"/>
            <THeader data="Actions" align="center" />
          </tr>
        </thead>
        <tbody>
          {users?.map((user: User, index) => (
            <TableUser
              id={index}
              key={index}
              data={user.name}
              email={user.email}
              details={() => console.log('details')}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  
  const data = await fetchUsers()
  return {
    props: {
      users: data.users,
    },
  };
};
export default Home;
