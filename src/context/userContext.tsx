import { client } from "@/server/apolloClient";
import { User } from "@/types/app";
import { gql } from "apollo-server-micro";
import { createContext, ReactNode, useContext, useState } from "react";

interface UserContextProps {
  users: User[];
  user: User;
  fetchUsers: () => Promise<any>;
  updateUsers: (param: User[]) => void;
  addUser: (name: string, email: string, image: string) => void;
  updateUser: (index: number, param: string) => void;
  deleteUser: (param: number) => void;
  addTask: (param: string) => void;
  deleteTask: (taskIndex: number) => void;
  finishTask: (taskIndex: number) => void;
  selectUser: (poram: User) => void;
}

interface UserContextProviderProps {
  children: ReactNode;
}

const UserContext = createContext({} as UserContextProps);

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User>({} as any);

  function updateState() {
    const updatedUsers = [...users];
    users[user.id] = user;
    setUsers(updatedUsers);
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
            }
          }
        }
      `,
    });
    return data;
  }

  function updateUsers(users: User[]) {
    setUsers(users);
  }

  function addUser(name: string, email: string, image: string){
    const updatedUsers = [...users]
    var latest = 0;
    updatedUsers.forEach(user => {
      if (user.id > latest) latest = user.id
    });

    const newUser: User = {
      id: latest,
      email: email,
      name: name,
      image: image,
      tasks: []
    }
    updatedUsers.push(newUser);
    setUsers(updatedUsers)
  }

  function updateUser(userIndex: number, data: string) {
    const newArray = [...users];
    newArray[userIndex].name == data;
    setUsers(newArray);
  }

  function deleteUser(userIndex: number) {
    setUsers((prevState) => {
      return [...prevState].filter((_, index) => index !== userIndex);
    });
  }

  function addTask(task: string) {
    var latest = 0;
    users.forEach(user => {
      user.tasks.map(task => {
        if (task.id > latest) latest = task.id
      });
    });
   
    setUser((prevState) => {
      const newTask = {
        id: prevState.tasks.length + 1,
        finished: false,
        task,
        userId: user.id,
      };
      const updatedTasks = [...prevState.tasks]
      updatedTasks.push(newTask)
      return {
        ...prevState,
        tasks: updatedTasks
      }
    });
  }

  function deleteTask(taskIndex: number) {
    const updatedTasks = { ...user }.tasks.filter((_, i) => i != taskIndex);
    setUser({
      ...user,
      tasks: updatedTasks,
    });
    updateState();
  }

  function finishTask(taskIndex: number) {
    setUser((prevState) => {
      const taskToFinish = prevState.tasks[taskIndex].finished;
      const updatedTasks = [...prevState.tasks];
      updatedTasks[taskIndex] = {
        ...updatedTasks[taskIndex],
        finished: !taskToFinish,
      };
      return {
        ...prevState,
        tasks: updatedTasks,
      };
    });
    updateState();
  }

  function updateTask(taskIndex: number, task: string) {
    setUser((prevState) => {
      const updatedTasks = [...prevState.tasks];
      updatedTasks[taskIndex] = { ...updatedTasks[taskIndex], task: task };
      return {
        ...prevState,
        tasks: updatedTasks,
      };
    });
  }

  function selectUser(user: User) {
    setUser(user);
  }

  return (
    <UserContext.Provider
      value={{
        users,
        fetchUsers,
        addUser,
        updateUsers,
        updateUser,
        deleteUser,
        addTask,
        deleteTask,
        finishTask,
        selectUser,
        user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => useContext(UserContext);
