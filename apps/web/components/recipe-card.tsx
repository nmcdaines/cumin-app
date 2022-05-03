import React from "react";
// import Link from "next/link";
import { ClockIcon } from "@heroicons/react/outline";

interface IRecipeCard {
  id: string;
  title: string;
  author: string;
  duration: string;
  onClick: Function;
}

const RecipeCard: React.FC<IRecipeCard> = ({ id, title, author, duration, onClick }) => {
  return (
    <button onClick={() => onClick(id)}>
      <div className="relative drop-shadow-lg rounded-md bg-emerald-600 text-white p-4 aspect-[5/6] text-left">
        <div className="font-light text-xl mb-1.5">
          <span className=" inline bg-slate-900 px-2 py-0.5 box-decoration-clone leading-8">
            {title}
          </span>
        </div>
        { author && (
          <div className="font-light text-sm">
            <span className=" inline bg-slate-900 px-2 py-0.5 box-decoration-clone leading-8">
              {author}
            </span>
          </div>
        )}

        <div className="absolute bottom-4 right-4 flex-row justify-end">
          <div className="font-light text-right leading-5 flex">
            <ClockIcon className="w-5 h-5 mr-3 text-white inline-block" />{" "}
            {duration}
          </div>
        </div>
      </div>
    </button>
  );
};

export {
  RecipeCard,
}
