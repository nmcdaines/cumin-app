import React from "react";

interface IIconList {
  items: {
    icon?: any;
    label: string;
  }[];
}

const IconList: React.FC<IIconList> = ({ items }) => {
  return (
    <ul>
      {items.map((item) => (
        <IconListItem
          key={`icon-list-item-${item.label}`}
          icon={item.icon}
          label={item.label}
        />
      ))}
    </ul>
  );
};

interface IIconListItem {
  icon?: any;
  label: string;
}

const IconListItem: React.FC<IIconListItem> = ({ icon: Icon, label }) => {
  return (
    <li className="flex mb-2 leading-5">
      {Icon && <Icon className="w-5 h-5 mr-3 text-gray-500" />}
      <span className={`${!Icon && "ml-8"}`}>{ label }</span>
    </li>
  );
};

export { IconList };
