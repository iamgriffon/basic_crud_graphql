import { useUsers } from "@/context/userContext";
import { User } from "@/types/app";
import { faPencil, faTasks, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/dist/client/router";
import { ChangeEvent, useRef, useState } from "react";

interface TableUserProps {
  id: number;
  data: string;
  email: string;
  details: User,
  getUser: (param: User) => void;
}

export function TableUser({
  id,
  data,
  email,
  details,
  getUser
}: TableUserProps) {
  const ref = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [isEditable, setIsEditable] = useState(false);
  const [input, setInput] = useState(() => data);
  const { updateUser, deleteUser } = useUsers();

  function handleChange(event: ChangeEvent<HTMLInputElement>){
    setInput(event.target.value)
    updateUser(id, input)
  }

  function handleClick(){
    getUser(details);
    router.push('/user')
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
            <button onClick={handleClick
            } className="rounded bg-green-500 text-white py-2 px-4 hover:bg-green-600 mr-2">
                <FontAwesomeIcon icon={faTasks} />
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
