import React, { useState } from "react";
import { useFormik, FieldArray } from "formik";
import { Button, FormSection, FormSectionDivider, TextField, Input, Select, SelectButton, SelectOption } from "ui";
import { DefaultLayout } from "web/layouts/default-layout";
import { RecipeModal } from "web/components/recipe-modal";
import { RecipeCard } from "web/components/recipe-card";
import { MinusCircleIcon } from "@heroicons/react/outline";

interface IIngredientInput {
  id?: number;
  unit: string;
  quantity: string;
  name: string;
}

interface IStepInput {
  id?: number;
  index: number | string;
  details: string;
  timer?: any;
}

interface IRecipeInput {
  title: string;
  description: string;
  ingredient_attributes: Array<IIngredientInput>;
  steps_attributes: Array<IStepInput>;
}

function UnitSelectButton({ value }: any) {
  return (
    <SelectButton>
      { value }
    </SelectButton>
  );
}

function UnitSelectOption({ value, label }: any) {
  return (
    <SelectOption>
      { value } { label } 
    </SelectOption>
  );
}

export default function NewRecipe() {
  const initialValues: IRecipeInput = {
    title: "",
    description: "",
    ingredient_attributes: [
      /* name, quantity, unit */
      { unit: "", quantity: "", name: "" }
    ],
    steps_attributes: [
      /* index, details, timer */
      { index: "0", details: "" }
    ],
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <DefaultLayout>
      <div className="py-8 px-4 flex justify-center">
        <div className="w-full max-w-5xl">
          <form onSubmit={formik.handleSubmit}>
            <FormSection title="Basic info" description="">
              <TextField
                label="Title"
                id="title"
                name="title"
                onChange={formik.handleChange}
                value={formik.values.title}
              />
              <TextField
                label="Description"
                id="description"
                name="description"
                onChange={formik.handleChange}
                value={formik.values.description}
              />
            </FormSection>
            <FormSectionDivider />
            <FormSection
              title="Ingredients"
              description="What yummy things are needed to make this recipe?"
            >
              <div className="flex flex-col">
                <div className="grid gap-x-2 grid-cols-5 mb-2 text-gray-700 font-medium text-sm">
                  <div>Unit</div>
                  <div>Quantity</div>
                  <div className="col-span-2">Name</div>
                </div>

                {formik.values.ingredient_attributes.map((value, index) => (
                  <div className="grid gap-x-2 grid-cols-5 mb-4">
                    <div>
                      <Select
                        selected={0}
                        options={[
                          { label: "g" },
                          { label: "ml" },
                          { label: "kg" }
                        ]}
                      />
                    </div>
                    <div>
                      <Input
                        label="Quantity"
                        id={`ingredient_attributes.${index}.quantity`}
                        name={`ingredient_attributes.${index}.quantity`}
                        onChange={formik.handleChange}
                        value={value?.quantity}
                      />
                    </div>
                    <div className="col-span-2">
                      <Input
                        label="Name"
                        id={`ingredient_attributes.${index}.name`}
                        name={`ingredient_attributes.${index}.name`}
                        onChange={formik.handleChange}
                        value={value?.name}
                      />
                    </div>
                    <div className="flex">
                      <Button
                        className="mt-1 ml-auto"
                        onClick={() =>
                          formik.values.ingredient_attributes.splice(index, 1)
                        }
                      >
                        <MinusCircleIcon className="w-5 h-5 text-slate-100" />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button
                  onClick={() =>
                    formik.values.ingredient_attributes.push({
                      unit: "",
                      quantity: "",
                      name: "",
                    })
                  }
                >
                  Add Ingredient
                </Button>
              </div>
            </FormSection>
            <FormSectionDivider />
            <FormSection
              title="Method"
              description="How do you make the recipe?"
            />
            <FormSectionDivider />
            {/* <FormSection
              title="Nutritional Information"
              description="Know how the food you eat will contribute to your health."
            />
            <FormSectionDivider /> */}
            <FormSection
              title="Notes"
              description="Anything else you want to remember?"
            />
            <div className="mt-8">
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
}
