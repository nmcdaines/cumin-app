import React from "react";

interface IFormSection {
  title: string;
  description: string;
  children: any;
}

const FormSection: React.FC<IFormSection> = ({
  title,
  description,
  children,
}) => {
  return (
    <div className="md:grid md:grid-cols-3 md:gap-6">
      <div className="md:col-span-1">
        <div className="px-4 sm:px-0">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            {title}
          </h3>
          <p className="mt-1 text-sm text-gray-600">{description}</p>
        </div>
      </div>
      <div className="mt-5 md:mt-0 md:col-span-2">
        <div className="shadow rounded-md px-4 py-5 bg-white space-y-6 sm:p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

const FormSectionDivider = () => {
  return (
    <div className="hidden sm:block" aria-hidden="true">
      <div className="py-5">
        <div className="border-t border-gray-200" />
      </div>
    </div>
  );
};

export { FormSection, FormSectionDivider };
