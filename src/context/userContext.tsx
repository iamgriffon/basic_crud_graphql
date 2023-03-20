import { client } from "@/server/apolloClient";
import { User } from "@/types/app";
import { gql } from "apollo-server-micro";
import { createContext, ReactNode, useContext, useState } from "react";

interface UserContextProps {
  users: User[]
  fetchUsers: () => Promise<any>;
  updateUsers: (param: User[]) => void;
  updateUser: (index: number, param: string) => void;
  deleteUser: (param: number) => void;
  addTask: (index: number, param: string) => void;
  deleteTask: (userIndex: number, taskIndex: number) => void;
}

interface UserContextProviderProps {
  children: ReactNode
}

const UserContext = createContext({} as UserContextProps);

export const UserContextProvider = ({children}: UserContextProviderProps) => {
  const [users, setUsers] = useState<User[]>([]);
  
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

  function updateUsers(users: User[]){
    setUsers(users)
  }

  function updateUser(userIndex: number, data: string){
    const newArray = [...users];
    newArray[userIndex].name == data;
    setUsers(newArray)
  }

   function deleteUser(userIndex: number){
    setUsers((prevState) => {
      return [...prevState].filter((_, index) => index !== userIndex)
    })
  }

  function addTask(userIndex: number, task: string){
    setUsers((prevState) => {
      const userTasks = prevState[userIndex].tasks;
      const updatedTasks = [...prevState];
      updatedTasks[userIndex].tasks = [...userTasks, {
        finished: false,
        task,
        userId: userIndex,
      }]
      return updatedTasks
    })
  }

  function deleteTask(userIndex: number, taskIndex: number){
   setUsers((prevState) => {
      const updatedTasks = prevState[userIndex].tasks.filter((_, index) => index !== taskIndex); //delete the task itself
      const updatedUsers = [...prevState]; //create a reference for the new state
      updatedUsers[userIndex] = { ...prevState[userIndex], tasks: updatedTasks } //place the actual changes in the new reference
      return updatedUsers //actually make the reference the new state.
   })
  }

  return (
    <UserContext.Provider value={{users, fetchUsers, updateUsers, updateUser, deleteUser: deleteUser, addTask, deleteTask}}>
      {children}
    </UserContext.Provider>
  )
}

export const useUsers = () => useContext(UserContext)