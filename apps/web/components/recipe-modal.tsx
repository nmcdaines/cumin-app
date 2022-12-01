import React from "react";
import { Button, LinkButton, Modal, Heading1 } from "ui";
import { ClockIcon, UserGroupIcon } from "@heroicons/react/outline";
import { CheckableList } from "web/components/checkable-list";
import { IconList } from "web/components/icon-list";

export interface IIngredient {
  id: number;
  name: string;
  unit: string;
  quantity: number;
  barcode: any;
}

export interface IStep {
  id: number;
  index: number;
  details: string;
}

export interface IRecipe {
  id: string;
  title: string;
  ingredients: Array<IIngredient>;
  steps: Array<IStep>;
  description: string;
}

interface IRecipeModal {
  isOpen: boolean,
  setOpen: Function,
  recipe: IRecipe,
}

const RecipeModal: React.FC<IRecipeModal> = ({ isOpen, setOpen, recipe }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <Modal title={recipe.title} onClose={() => setOpen(false)} open={isOpen}>
      <div className="grid sm:grid-cols-3 gap-8">
        <div className="sm:order-last">
          <IconList
            items={[
              { icon: ClockIcon, label: "45 Minutes" },
              { icon: UserGroupIcon, label: "6 Servings" },
            ]}
          />
          <Heading1>Ingredients</Heading1>
          <CheckableList
            className="pt-2"
            items={recipe.ingredients?.map((item) => ({
              id: item.id,
              label: `${item.quantity}${item.unit} ${item.name}`
            }))}
            selected={["1"]}
            toggleSelected={() => {}}
          />
        </div>

        <div className="col-span-2">
          { recipe.description && (
            <div className="text-xl font-thin pb-4 text-slate-600">
              {recipe.description}
            </div>
          )}

          <Heading1>Method</Heading1>

          {recipe?.steps?.map((step) => (
            <div key={`step-${step.id}`}>
              <div className="text-lg">Step {step.index + 1}</div>
              <div className="font-light mb-4">
                {step.details}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between mt-4">
        <div>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
        </div>
        <div>
          <LinkButton
            className="mr-2"
            href={`/planner/current?addRecipe=${recipe.id}`}
          >
            Add to planner
          </LinkButton>
          <LinkButton className="mr-2" href={`/recipes/${recipe.id}`}>Let's cook</LinkButton>
          <LinkButton href={`/recipes/${recipe.id}/cook`}>Open</LinkButton>
        </div>
      </div>
    </Modal>
  );
};

export {
  RecipeModal,
}
