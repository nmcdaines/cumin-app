import * as React from "react";
import cx from "classnames";
import Link from "next/link";
const Button = ({ children, onClick, className, noPadding }: any) => {
  return (
    <button
      className={cx(
        `inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md`,
        `text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`,
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const FullWidthButton = () => {
  return (
    <button className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
      Sign in
    </button>
  );
};

const LinkButton = ({ children, href, className }: any) => {
  return (
    <Link href={href}>
      <a
        className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
          className ? className : ""
        }`}
      >
        {children}
      </a>
    </Link>
  );
};

export { Button, FullWidthButton, LinkButton };