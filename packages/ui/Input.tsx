import * as React from "react";

export const Input = ({
  id,
  name,
  type = "text",
  autoComplete,
  required,
  placeholder,
  ...props
}: any) => {
  return (
    <input
      id={id}
      name={name}
      type={type}
      autoComplete={autoComplete}
      required={required}
      placeholder={placeholder}
      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
      {...props}
    />
  );
};

export const Label = ({ text, name }: any) => {
  return (
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">{text}</label>
  );
};

export const TextField = ({ label, ...inputProps }: any) => {
  return (
    <>
      <Label text={label} />
      <Input {...inputProps} />
    </>
  );
};
