import React, { ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";

interface ModalProps {
  title: string
  children?: ReactNode
}

export function Modal({title, children}: ModalProps) {
  return (
    <>
      <Dialog.Overlay className="bg-gray-700 fixed inset-0 opacity-60" />
      <Dialog.Content className="bg-white w-auto flex-col justify-center rounded-6 shadow-lg fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-90vw max-h-85vh p-25 animate-contentShow duration-150 ease-out focus:outline-none">
        <header className="flex justify-between border-b-2 pb-2">
          <Dialog.Title className="font-medium mx-2 p-2 text-2xl">
            {title}
          </Dialog.Title>
          <Dialog.Close asChild>
            <button className="font-bold text-xl pr-3 hover:text-gray-300 " aria-label="Close">
              X
            </button>
          </Dialog.Close>
        </header>
        <div className="mt-3 mr-0 mb-5 leading-[1.5]">
          {children}
        </div>
      </Dialog.Content>
    </>
  );
}
