import { Modal } from "@/components/modal/Dialog";
import { TableHeader } from "@/components/table/TableHeader";
import { TableTask } from "@/components/table/TableTask";
import { useUsers } from "@/context/userContext";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Dialog from "@radix-ui/react-dialog";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";

export const User: NextPage = () => {
  const { finishTask, deleteTask, addTask, user } = useUsers();
  const [task, setTask] = useState("");
  const [open, setIsOpen] = useState(false);
  const router = useRouter();
  const { email, image, tasks, name } = user;

  function goBack() {
    if (!tasks) router.push("/");
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    addTask(task);
    setIsOpen(false);
  }

  useEffect(() => {
    return () => goBack();
  });

  if (!tasks) {
    return <></>;
  }

  const totalTasks = tasks.reduce((task) => task + 1, 0);

  const finishedTasks = tasks.reduce((acc, task) => {
    if (task.hasOwnProperty("finished") && task.finished) {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);

  return (
    <Dialog.Root open={open} onOpenChange={setIsOpen}>
      <div className="bg-white px-6 py-4 rounded-lg shadow-xl mx-auto max-w-5xl my-10">
        <header className="flex items-center justify-around gap-3 mb-2">
          <Link href="/">
            <button className="font-bold text-lg">{"← Home"}</button>
          </Link>
          <div className="flex-col">
            <Image src={image} width={70} height={70} alt="" />
          </div>

          <div className="flex flex-col mx-3">
            <div className="flex flex-nowrap gap-2">
              <span className="font-bold text-slate-500">Name: </span>
              <p>{name}</p>
            </div>
            <div className="flex flex-nowrap gap-2">
              <span className="font-bold text-slate-500">Email: </span>
              <p>{email}</p>
            </div>
            <div className="flex flex-nowrap gap-2">
              <span className="font-bold text-slate-500">Total Tasks: </span>
              <p className="font-bold">{totalTasks}</p>
            </div>
            <div className="flex flex-nowrap gap-2">
              <span className="font-bold text-slate-500">Finished Tasks: </span>
              <p className="font-bold">{finishedTasks}</p>
            </div>
          </div>

          <Dialog.Trigger>
            <div>
              <button className="bg-green-500 text-green-50 p-2 rounded hover:bg-green-700 hover:text-green-100">
                <FontAwesomeIcon icon={faAdd} className="mr-2" />
                Task
              </button>
            </div>
          </Dialog.Trigger>
          <Modal title="New Task">
            <form onSubmit={handleSubmit}>
              <fieldset className="flex gap-5 mx-4 mb-4">
                <label className="w-24 pt-2 font-bold" htmlFor="name">
                  Task:
                </label>
                <input
                  type="text"
                  className="inline-flex px-3 items-center justify-center leading-[1] h-9 rounded-md shadow outline-gray-700 focus:outline focus:gray-800 font-mono text-gray-600"
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  id="name"
                />
              </fieldset>
              <div className="flex flex-row items-center">
                <button
                  aria-label="Close"
                  className="rounded mx-8 mt-2 w-full max-w-[300px] py-2 px-2 h-full max-h-20 text-lime-50 bg-green-400 hover:bg-green-700 hover:text-lime-200"
                >
                  Add Task
                </button>
              </div>
            </form>
          </Modal>
        </header>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <TableHeader data="Task" align="left" />
              <TableHeader data="Actions" align="right" />
            </tr>
          </thead>
          <tbody>
            {user
              ? user.tasks?.map((task, index) => (
                  <TableTask
                    key={task.id}
                    index={index}
                    data={task}
                    destroy={deleteTask}
                    complete={finishTask}
                  />
                ))
              : null}
          </tbody>
        </table>
      </div>
    </Dialog.Root>
  );
};

export default User;
