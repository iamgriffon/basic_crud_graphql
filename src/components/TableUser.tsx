import { useUsers } from "@/context/userContext";
import { faPencil, faTasks, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { ChangeEvent, useRef, useState } from "react";

interface TableUserProps {
  id: number;
  data: string;
  email?: string;
  details?: (param: number) => void;
}

export function TableUser({
  id,
  data,
  email,
  details,
}: TableUserProps) {
  const ref = useRef<HTMLInputElement>(null);
  const [isEditable, setIsEditable] = useState(false);
  const [input, setInput] = useState(() => data);
  const { updateUser, deleteUser } = useUsers();

  function handleChange(event: ChangeEvent<HTMLInputElement>){
    setInput(event.target.value)
    updateUser(id, input)
  }

  function handleUpdateClick() {
    setIsEditable(!isEditable);
    ref?.current?.focus();
  }

  return (
    <tr className="hover:bg-gray-100">
      <td className={`px-6 py-4 capitalize`}>
        <input
          type="text"
          value={input}
          className="bg-transparent w-full px-1"
          readOnly={!isEditable}
          onBlur={(e) => {
            setIsEditable(false);
            if (e.target.value.length == 0) setInput("<No Name>");
          }}
          onChange={(e) => {
            handleChange(e)
          }}
          ref={ref}
        />
      </td>
      <td className={`px-6 py-4 capitalize`}>
        <input
          type="text"
          value={email}
          className="bg-transparent w-full px-1"
          disabled
        />
      </td>

      <td className="text-right">
        <div className="w-full">
          {details && (
            <button className="rounded bg-green-500 text-white py-2 px-4 hover:bg-green-600 mr-2">
              <Link href="/">
                <FontAwesomeIcon icon={faTasks} />
              </Link>
            </button>
          )}
          <button
            onClick={handleUpdateClick}
            className="rounded bg-yellow-500 text-white py-2 px-4 hover:bg-yellow-600 mr-2"
          >
            <FontAwesomeIcon icon={faPencil} />
          </button>

          <button
            onClick={() => deleteUser(id)}
            className="rounded bg-red-500 text-white py-2 px-4 hover:bg-red-600 mr-2"
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </td>
    </tr>
  );
}
