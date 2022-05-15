import React, {Fragment} from "react";
import classNames from "classnames";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

function TopBarIcon({ iconComponent: IconComponent }: any) {
  return (
    <IconComponent className="h-6 w-6" aria-hidden="true" />
  );
}

function TopBarImageIcon({ src, alt }: any) {
  return (
    <img
      className="h-8 w-8 rounded-full"
      src={src}
      alt={alt || ""}
    />
  );
}

function TopBarButton({ iconComponent, srText, onClick }: any) {
  return ( 
    <button
      type="button"
      className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
      onClick={onClick}
    >
      <span className="sr-only">{srText}</span>
      {iconComponent}
    </button>
  );
}

interface IMenuItem {
  href: string;
  name: string;
}

interface ITopBarMenuProps {
  iconComponent: any;
  menuItems: IMenuItem[];
  srText: string;
  user: any;
}

function TopBarMenu({ iconComponent, srText, user, menuItems }: ITopBarMenuProps) {
  return (
    <Menu as="div" className="ml-3 relative">
      <div>
        <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
          <span className="sr-only">{srText}</span>
          { iconComponent } 
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          {menuItems.map((item) => (
            <Menu.Item key={item.name}>
              {({ active }) => (
                <a
                  href={item.href}
                  className={classNames(
                    active ? "bg-gray-100" : "",
                    "block px-4 py-2 text-sm text-gray-700"
                  )}
                >
                  {item.name}
                </a>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  ); 
}


function TopNavbar () {

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  {/* TODO: replace with custom logo */}
                  <img
                    className="h-8 w-8"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                    alt="Workflow"
                  />
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {/* TODO: navigation */}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md-ml-6">
                  <TopBarButton
                    iconComponent={
                      <TopBarIcon iconComponent={BellIcon} />
                    }
                    srText="View notifications"
                    onClick={() => {}}
                  />
                  <TopBarMenu
                    iconComponent={
                      <TopBarImageIcon src={user.imageUrl} />
                    }
                    srText="Open user menu"
                    user={user}
                    menuItems={[]}
                  />
                </div>

                <div className="-mr-2 flex md:hidden">
                  <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    <TopBarIcon iconComponent={open ? XIcon : MenuIcon} />
                  </Disclosure.Button>
                </div>
              </div>
            </div>
            <Disclosure.Panel className="md:hidden">

            </Disclosure.Panel>
          </div>
        </>
      )}
    </Disclosure>
  );
}

export { TopNavbar };

