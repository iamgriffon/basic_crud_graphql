import { Task } from "@/types/app";
import { faCheck, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, useEffect, useRef, useState } from "react";

interface ToDoProps {
  index: number;
  data: Task;
  complete: (param: number) => void;
  destroy: (param: number) => void;
  update?: (param: number) => void;
}

export function TableTask({
  index,
  data,
  destroy,
  complete,
  update,
}: ToDoProps) {
  const ref = useRef<HTMLInputElement>(null);
  const [isEditable, setIsEditable] = useState(false);
  const [input, setInput] = useState(() => data.task);

  function setNewTask(Event: ChangeEvent<HTMLInputElement>) {
    setInput(Event.target.value);
  }

  function handleUpdateClick() {
    setIsEditable(!isEditable);
    ref?.current?.focus();
  }

  function handleDelete() {
    destroy(index);
    console.log("handleDelete", data)
  }

  function handleCheck() {
    complete(index);
    console.log("handleCheck", data);
  }

  return (
    <tr className="hover:bg-gray-100">
      <td
        className={`px-6 py-4 capitalize ${
          data.finished === true ? "line-through" : ""
        }`}
      >
        <input
          type="text"
          value={input}
          className={`bg-transparent w-full px-1 ${
            data.finished ? "line-through" : ""
          }`}
          readOnly={!isEditable}
          onBlur={(e) => {
            setIsEditable(false);
            if (e.target.value.length == 0) setInput("<No Name>");
          }}
          onChange={(e) => {
            setNewTask(e);
          }}
          ref={ref}
        />
      </td>

      <td className="text-right">
        <div className="w-full">
          <button
            onClick={handleCheck}
            className="rounded bg-green-500 text-white py-2 px-4 hover:bg-green-600 mr-2"
          >
            <FontAwesomeIcon icon={faCheck} />
          </button>
          {update && (
            <button
              onClick={handleUpdateClick}
              className="rounded bg-yellow-500 text-white py-2 px-4 hover:bg-yellow-600 mr-2"
            >
              <FontAwesomeIcon icon={faPencil} />
            </button>
          )}
          <button
            onClick={handleDelete}
            className="rounded bg-red-500 text-white py-2 px-4 hover:bg-red-600 mr-2"
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </td>
    </tr>
  );
}
