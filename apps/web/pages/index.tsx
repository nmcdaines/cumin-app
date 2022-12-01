import React, { useState } from "react";
import Link from "next/link";
import { Button, TopNavbar } from "ui";
import { useQuery } from "react-query";
// import { auth } from "data";
import { auth, recipe } from "data";

import { useLogin, useAuth } from "../context/auth-context";

import { DefaultLayout } from "web/layouts/default-layout";

import { RecipeCard } from "web/components/recipe-card";
import { RecipeModal } from "web/components/recipe-modal";

import {
  BriefcaseIcon,
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
  CurrencyDollarIcon,
  LinkIcon,
  LocationMarkerIcon,
  PencilIcon,
  PlusIcon,
} from "@heroicons/react/solid";

export default function Web() {
  const { isLoading, error, data } = useQuery("recipes", async () => {
    const { data }: any = await recipe.all();
    return data;
  });

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(undefined);


  const item: any = data?.find((item: any) => item.id === selected) || {};

  const { user } = useAuth();

  const { login, logout } = useLogin();

  return (
    <DefaultLayout>
      <TopNavbar />

      {!user &&(
        <button
          onClick={() =>
            login({ email: "user3@apiguard.com", password: "api_password" })
          }
        >
          Login
        </button>
      )}

      {selected && (
        <RecipeModal isOpen={open} setOpen={setOpen} recipe={item} />
      )}

      <div className="flex justify-center mt-8">
        <div className="w-full max-w-7xl grid grid-cols-2 xs:gird-cols-3 sm:grid-cols-4 md:gird-cols-4 xl:grid-cols-5 gap-4 px-4 sm:px-6 lg:px-8">
          {data?.map((item: any) => (
            <RecipeCard
              key={`recipe-card-${item.id}`}
              id={item.id}
              title={item.title}
              author={item.author}
              duration={item.duration}
              onClick={() => {
                setSelected(item.id);
                setOpen(true);
              }}
            />
          ))}
        </div>
      </div>
    </DefaultLayout>
  );
}
