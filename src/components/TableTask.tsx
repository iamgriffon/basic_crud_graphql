import { faCheck, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, useRef, useState } from "react";

interface ToDoProps {
  data: string;
  finished?: boolean;
  add?: (param: number) => void;
  complete?: (param: number) => void;
  destroy?: (param: number) => void;
  update?: (param: number) => void;
}

export function Task({ data, finished, destroy, complete, update }: ToDoProps) {

  const ref = useRef<HTMLInputElement>(null);
  const [isEditable, setIsEditable] = useState(false);
  const [input, setInput] = useState(() => data);
  const [checked, setChecked] = useState(() => false);

  function setNewTask(Event: ChangeEvent<HTMLInputElement>) {
    setInput(Event.target.value);
  }

  function handleUpdateClick() {
    setIsEditable(!isEditable);
      ref?.current?.focus();
      console.log(`Focus is: ${isEditable}`)
  }

  function handleCheck(){
    setChecked(!checked);
    console.log('checked is now', checked)
  }

  return (
    <tr className="hover:bg-gray-100">
      <td
        className={`px-6 py-4 capitalize ${
          checked===true ? "line-through" : ""
        }`}
      >
        <input
          type="text"
          value={input}
          className="bg-transparent w-full px-1"
          readOnly={!isEditable}
          onBlur={(e) => {
            setIsEditable(false)
            if (e.target.value.length == 0) setInput('<No Name>')
          }}
          onChange={(e) => {
            setNewTask(e)
          }}
          ref={ref}
        />
      </td>

      <td className="text-right">
        <div className="w-full">
          {complete && (
            <button
              onClick={handleCheck}
              className="rounded bg-green-500 text-white py-2 px-4 hover:bg-green-600 mr-2"
            >
              <FontAwesomeIcon icon={faCheck} />
            </button>
          )}
          {update && (
            <button
              onClick={handleUpdateClick}
              className="rounded bg-yellow-500 text-white py-2 px-4 hover:bg-yellow-600 mr-2"
            >
              <FontAwesomeIcon icon={faPencil} />
            </button>
          )}
          {destroy && (
            <button
              onClick={() => destroy}
              className="rounded bg-red-500 text-white py-2 px-4 hover:bg-red-600 mr-2"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          )}

        </div>
      </td>
    </tr>
  );
}
