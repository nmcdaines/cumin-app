import { Listbox, Transition } from "@headlessui/react";
import classNames from "classnames";
import React, { Fragment } from "react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

interface IValue {
  value: any;
}


interface ISelectOptionBase extends IValue {
  children(props: {
    selected?: boolean;
    active?: boolean;
    disabled?: boolean;
    value?: T;
  }): React.ReactNode;
}


interface SelectProps<T extends IValue = {value: any, label: any}> {
  value: T["value"];
  onChange: (value: T["value"]) => any;
  options: T[];
  itemComponent?: (props: T) => JSX.Element;
  selectedComponent?: React.FC<T>;
};


/*

<SelectComponent
  selectedComponent={
    {(value, label) => {
      <SelectButton>
        { label }
      </SelectButton>
    }}
  }
  optionComponent={
    (selected, active, disabled) => ({
      <div>
        { selected ? `` : ``}
      </div>
    })
  }
/>

*/



function SelectButton<T>({ label }: T & IValue & any) {
  return (
    <SelectButtonBase>
      <span className="block truncate">{label}</span>
    </SelectButtonBase>
  );
}


function SelectButtonBase({ children }: any) {
  return (
    <Listbox.Button
      className={classNames(
        "relative bg-white border border-gray-300 rounded-md shadow-sm cursor-default",
        "w-full pl-3 pr-10 py-2",
        "sm:text-sm text-left",
        "focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500",
      )}
    >
      <span className="flex items-center">
        {children}
      </span>
      <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
      </span>
    </Listbox.Button>
  );
}


function SelectOption({ value, label }: any) {
  return (
    <SelectOptionBase value={value}>
      {({ selected, active }) => (
        <>
          <div className="flex items-center">
            <span
              className={classNames(
                selected ? "font-semibold" : "font-normal",
                "block truncate"
              )}
            >
              {label}
            </span>
          </div>

          {selected ? (
            <span
              className={classNames(
                active ? "text-white" : "text-indigo-600",
                "absolute inset-y-0 right-0 flex items-center pr-4"
              )}
            >
              <CheckIcon className="h-5 w-5" aria-hidden="true" />
            </span>
          ) : null}
        </>
      )}
    </SelectOptionBase>
  );
}


function SelectOptionBase({ children, value }: ISelectOptionBase) {
  return (
    <Listbox.Option
      value={value}
      className={({ active }) =>
        classNames(
          active ? "text-white bg-indigo-600" : "text-gray-900",
          "cursor-default select-none relative py-2 pl-3 pr-9"
        )
      }
    >
      {children}
    </Listbox.Option>
  );
}


const Select = <T extends IValue = {value: any, label: any}>({
  value: selectedValue,
  onChange,
  options,
  itemComponent,
  selectedComponent,
}: SelectProps<T>) => {
const SelectComponent = selectedComponent || SelectButton;
  const ItemComponent = itemComponent || SelectOption;
  const selected = options.find(({ value }) => value === selectedValue);

  return (
    <Listbox value={selectedValue} onChange={onChange}>
      {({ open }) => (
        <>
          <SelectComponent {...selected} />
          <Transition
            show={open}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              className={classNames(
                "absolute z-10 mt-1 w-48 bg-white shadow-lg max-h-56 rounded-md py-1 overflow-auto  ",
                "text-base sm:text-sm",
                "ring-black ring-opacity-5 ring-1 focus:outline-none"
              )}
            >
              {/* {options.map((option: any) => (
                <ItemComponent key={option.value} {...option} />
              ))} */}

              {/* {children} */}
            </Listbox.Options>
          </Transition>
        </>
      )}
    </Listbox>
  );


}

export {
  Select,
  SelectOptionBase,
  SelectOption,
};
