import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationIcon } from "@heroicons/react/outline";

import cx from "classnames";
import { XIcon } from "@heroicons/react/solid";

export const ModalCover = ({ children }: any) => {
  return (
    <div
      className={cx(
        /* background */ "bg-gradient-to-r from-sky-500 to-indigo-500",
        /* dimensions */ "h-52 p-4",
        /* layout */ "relative flex items-end"
      )}
    >
      <img
        className="w-full h-full left-0 top-0 absolute object-cover rounded-t-lg"
        src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
      />
      <div className="bg-gray-800/60 w-full h-full absolute left-0 top-0 rounded-lg" />
      <div className="z-10">{children}</div>
    </div>
  );
};

export const Modal = ({ children, title, onClose, open }: any) => {
  return (
    <Transition.Root show={open} as={Fragment} appear>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={onClose}
      >
        <div className="items-end justify-center min-h-screen p-4 text-center block">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-900 bg-opacity-80 transition-opacity backdrop-blur-md" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative inline-block bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 align-middle w-full md:w-4/5 lg:max-w-4xl">
              <button className="absolute top-4 right-4 z-10 rounded-lg bg-white/20 hover:bg-white/50 p-2" onClick={onClose}>
                <XIcon className="w-5 h-5 text-white" />
              </button>

              <ModalCover>
                <div className="text-white text-3xl tracking-wide font-normal">
                  {title}
                </div>
              </ModalCover>

              <div className="p-4">{children}</div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
