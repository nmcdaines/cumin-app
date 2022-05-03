import React from "react";

interface IDefaultLayoutProps {}

const DefaultLayout: React.FC<IDefaultLayoutProps> = ({children}) => {
  return (
    <>
      {children}
    </>
  );
}

export {
  DefaultLayout,
};
