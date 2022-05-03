import React from "react";
import { CheckIcon } from "@heroicons/react/solid";

interface ICheckableList {
  className?: string;
  items: {
    id: string;
    label: string;
  }[];

  selected: string[];
  toggleSelected: Function;
}

const CheckableList: React.FC<ICheckableList> = ({
  className,
  items = [],
  selected = [],
  toggleSelected,
}) => {
  return (
    <ul className={className}>
      {items.map(({ id, label }) => (
        <CheckableListItem
          key={`checkable-list-item-${id}`}
          id={id}
          label={label}
          selected={selected.includes(id)}
          toggleSelected={toggleSelected}
        />
      ))}
    </ul>
  );
};

interface ICheckableListItem {
  id: string;
  label: string;
  selected?: boolean;
  toggleSelected: Function;
}

const CheckableListItem: React.FC<ICheckableListItem> = ({ label, selected }) => {
  return (
    <li className="flex mb-2">
      <button className={`border-2 ${selected ? "border-green-500 bg-green-200" : "border-gray-300"}  rounded-full w-6 h-6 flex items-center justify-center mr-3`}>
        { selected && <CheckIcon className="w-4 h-4 text-green-500" /> }
      </button>
      <div>{label}</div>
    </li>
  );
};

export { CheckableList };
