import { LockClosedIcon } from "@heroicons/react/solid";
import { FullWidthButton, Input, Label, TextField } from "ui";
import { LogoDark } from "web/components/logo";

export default function Login() {
  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <LogoDark />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{" "}
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                sign up for an account
              </a>
            </p>
          </div>
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <div>
                <TextField label="Email" />
              </div>
              <div className="mt-6">
                <TextField label="Password" type="password" />
              </div>
              <div className="mt-6">
                <FullWidthButton></FullWidthButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
