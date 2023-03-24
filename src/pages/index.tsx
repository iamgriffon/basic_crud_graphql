import { TableHeader } from "@/components/table/TableHeader";
import { TableUser } from "@/components/table/TableUser";
import { useUsers } from "@/context/userContext";
import { client } from "@/server/apolloClient";
import { User } from "@/types/app";
import { gql, useMutation } from "@apollo/client";
import { GetServerSideProps, NextPage } from "next";
import { FormEvent, useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Modal } from "@/components/modal/Dialog";
import { ADD_USER } from "@/server/mutations";

interface HomeProps {
  users: User[];
}

type NewUser = {
  email: string,
  name: string,
  image: string
}

async function fetchUsers() {
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
            finished
          }
        }
      }
    `,
  });
  return data;
}

export const Home: NextPage<HomeProps> = (props) => {
  console.log(props);
  const { users, updateUsers, selectUser } = useUsers();
  const [addUser] = useMutation(ADD_USER)
  const [user, setUser] = useState<NewUser>({
    email: "",
    image: "",
    name: "",
  });

  function handleSubmitNewUser(Event: FormEvent){
    Event.preventDefault();
    const { name, email, image } = user
    addUser({
      variables: {
        email: email,
        name: name,
        image: `${image}.png`
      }
    })
    console.log(addUser)
  }

  useEffect(() => {
    return () => updateUsers(props.users);
  });

  return (
    <Dialog.Root>
      <div className="bg-white p-6 rounded-lg shadow-xl mx-auto max-w-5xl my-10">
        <h1 className="text-4xl font-bold pb-2 text-center mb-2">
          GraphQL ToDo
        </h1>
        <div className="flex flex-row justify-end items-center gap-3">
          <Dialog.Trigger asChild>
            <button className="bg-green-500 text-green-50 hover:bg-green-700 hover:text-green-100 p-2 mb-3 rounded">
              Add User
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Modal title="New User">
              <form onSubmit={handleSubmitNewUser}>
                <fieldset className="flex gap-5 mx-4 mb-4">
                  <label className="w-24 pt-2 font-bold" htmlFor="name">
                    Name:{" "}
                  </label>
                  <input
                    type="text"
                    className="inline-flex px-3 items-center justify-center leading-[1] h-9 rounded-md shadow outline-gray-700 focus:outline focus:gray-800 font-mono text-gray-600"
                    id="name"
                    value={user?.name}
                    onChange={(e) =>
                      setUser((prevState) => {
                        return {
                          ...prevState,
                          name: e.target.value,
                        };
                      })
                    }
                  />
                </fieldset>
                <fieldset className="flex gap-5 mx-4 mb-4">
                  <label className="w-24 pt-2 font-bold" htmlFor="email">
                    Email:{" "}
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="inline-flex px-3 items-center justify-center leading-[1] h-9 rounded-md shadow outline-gray-700 focus:outline focus:gray-800 font-mono text-gray-600"
                    value={user.email}
                    onChange={(e) =>
                      setUser((prevState) => {
                        return {
                          ...prevState,
                          email: e.target.value,
                        };
                      })
                    }
                  />
                </fieldset>
                <fieldset className="flex gap-5 mx-4 mb-4">
                  <label className="w-24 pt-2 font-bold" htmlFor="img">
                    Image Link:{" "}
                  </label>
                  <input
                    id="img"
                    type="text"
                    className="inline-flex px-3 items-center justify-center leading-[1] h-9 rounded-md shadow outline-gray-700 focus:outline focus:gray-800 font-mono text-gray-600"
                    value={user.image}
                    onChange={(e) =>
                      setUser((prevState) => {
                        return {
                          ...prevState,
                          image: e.target.value,
                        };
                      })
                    }
                  />
                </fieldset>
                <div className="flex flex-row items-center">
                  <button className="rounded mx-8 mt-2 w-full max-w-[300px] py-2 px-2 h-full max-h-20 text-green-50 bg-green-400 hover:bg-green-700 hover:text-lime-200">
                    Add User
                  </button>
                </div>
              </form>
            </Modal>
          </Dialog.Portal>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <TableHeader data="Name" align="left" />
              <TableHeader data="Email" align="left" />
              <TableHeader data="Actions" align="center" />
            </tr>
          </thead>
          <tbody>
            {users?.map((user: User, index) => (
              <TableUser
                id={index}
                key={index}
                data={user.name}
                email={user.email}
                details={user}
                getUser={() => selectUser(user)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </Dialog.Root>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await fetchUsers();
  return {
    props: {
      users: data.users,
    },
  };
};
export default Home;
