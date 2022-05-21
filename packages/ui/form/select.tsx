import { Listbox, Transition } from "@headlessui/react";
import classNames from "classnames";
import React, { Fragment } from "react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";


interface IBaseSelectProps<T> {
  options: T[];
  idFromValue: (value: T) => string | number;
  labelFromValue?: (value?: T) => string | JSX.Element | undefined;
  components?: {
    Control?: (props: ISelectControlProps<T>) => JSX.Element;
    Option?: (props: ISelectOptionProps<T>) => JSX.Element;
  };
}

interface ISingleSelectProps<T> extends IBaseSelectProps<T> {
  multiple?: false;
  value?: T;
  onChange: (value: T) => void;
}

// TODO: implement multi-select option
//       see: https://dev.to/janjakubnanista/a-peculiar-journey-to-a-generic-react-component-using-typescript-3cm8

type SelectProps<T> = ISingleSelectProps<T>;

function Select<T>(props: SelectProps<T>) {
  const { components, idFromValue, labelFromValue, onChange, options, value } = props;

  const Control = components?.Control || SelectControl;
  const Option = components?.Option || SelectOption;

  console.log("options", options);

  return (
    <Listbox value={value} onChange={onChange}>
      {({ open }) => (
        <>
          <div className="relative">
            <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <Control
                open={open}
                value={value}
                labelFromValue={labelFromValue}
              />
            </Listbox.Button>
            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 w-40 bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {options.map((option: T) => (
                  <Listbox.Option
                    key={idFromValue(option)}
                    className={({ active }) =>
                      classNames(
                        active ? "text-white bg-indigo-600" : "text-gray-900",
                        "cursor-default select-none relative py-2 pl-3 pr-9"
                      )
                    }
                    value={option}
                  >
                    {({ active, selected }) => (
                      <>
                        <Option
                          active={active}
                          selected={selected}
                          value={option}
                          labelFromValue={labelFromValue}
                        />
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}

export interface ISelectControlProps<T> {
  open: boolean;
  value?: T;
  labelFromValue?: (value?: T) => string | JSX.Element | undefined;
}

function SelectControl<T>({ value, labelFromValue }: ISelectControlProps<T>) {
  const label = labelFromValue ? labelFromValue(value) : "";

  return (
    <>
      <span className="flex items-center h-5">
        <span className="block truncate ">{label}</span>
      </span>
      <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
      </span>
    </>
  );
}

export interface ISelectOptionProps<T> {
  active: boolean;
  selected: boolean;
  value: T;
  labelFromValue?: (value?: T) => string | JSX.Element;
}

function SelectOption<T>({ active, selected, labelFromValue, value }: ISelectOptionProps<T>) {
  const label = labelFromValue ? labelFromValue(value) : "";

  return (
    <>
      <div className="flex items-center">
        <span
          className={classNames(
            selected ? "font-semibold" : "font-normal",
            "ml-3 block truncate"
          )}
        >
          { label }
        </span>
      </div>

      {selected ? (
        <span
          className={classNames(
            active ? 'text-white': 'text-indigo-600',
            'absolute inset-y-0 right-0 flex items-center pr-4'
          )}
        >
          <CheckIcon className="h-5 w-5" aria-hidden="true" />
        </span>
      ) : null}
    </>
  );
}

Select.Control = SelectControl;
Select.Option = SelectOption;

export { Select };
