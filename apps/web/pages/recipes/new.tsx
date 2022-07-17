import React, { useCallback, useMemo, useState, useRef } from "react";
import { useFormik, FieldArray, Formik } from "formik";
import classNames from "classnames";
import {
  Button,
  FormSection,
  FormSectionDivider,
  TextField,
  Input,
  Select,
  ISelectControlProps,
  ISelectOptionProps,
} from "ui";
import { DefaultLayout } from "web/layouts/default-layout";
import { RecipeModal } from "web/components/recipe-modal";
import { RecipeCard } from "web/components/recipe-card";
import { MinusCircleIcon } from "@heroicons/react/outline";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { createEditor, BaseEditor, Descendant } from "slate";
import { Slate, Editable, withReact, ReactEditor } from "slate-react";
import { withHistory } from "slate-history";
import update from "immutability-helper";
import { useDrag, useDrop } from 'react-dnd';
import type { Identifier, XYCoord } from 'dnd-core'

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

// function UnitSelectButton({ value }: any) {
//   return <SelectButton>{value}</SelectButton>;
// }

// function UnitSelectOption({ value, label }: any) {
//   return (
//     <SelectOption>
//       {value} {label}
//     </SelectOption>
//   );
// }

export default function NewRecipe() {
  const initialValues: IRecipeInput = {
    title: "",
    description: "",
    ingredient_attributes: [
      /* name, quantity, unit */
      { unit: "", quantity: "", name: "" },
    ],
    steps_attributes: [
      /* index, details, timer */
      { index: "0", details: "" },
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
              description="A little bit of this, and a little bit of that"
            >
              <div className="flex flex-col">
                <div className="grid gap-x-2 grid-cols-7 mb-1 text-gray-700 font-medium text-sm">
                  <div className="col-span-2 lg:col-span-2">Unit</div>
                  <div className="col-span-1">Qty</div>
                  <div className="col-span-3 lg:col-span-3">Name</div>
                </div>

                {formik.values.ingredient_attributes.map((value, index) => (
                  <IngredientRow
                    key={`ingredient-${index}`}
                    path={`ingredient_attributes.${index}`}
                    value={value}
                    remove={() =>
                      formik.values.ingredient_attributes.splice(index, 1)
                    }
                    handleChange={formik.handleChange}
                    setFieldValue={formik.setFieldValue}
                  />
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
            >
              <Steps />
            </FormSection>
            <FormSectionDivider />
            {/* <FormSection
              title="Nutritional Information"
              description="Know how the food you eat will contribute to your health."
            />
            <FormSectionDivider /> */}
            <FormSection
              title="Notes"
              description="Anything else you want to remember?"
            >
              <NoteRow />
            </FormSection>
            <div className="mt-8">
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
}

interface IIngredientRowProps {
  path: string;
  value: any;

  handleChange: (value: any) => void;
  setFieldValue: (field: string, value: any) => void;
  remove: () => void;
}

function IngredientRow({ path, handleChange, setFieldValue, value, remove }: IIngredientRowProps) {
  const ingredients = [
    { id: 1, abbreviation: "g", name: "grams" },
    { id: 2, abbreviation: "ml", name: "millilitre" },
    { id: 3, abbreviation: "kg", name: "kilograms" },
  ];
  // debugger;
  const selectedIngredient = ingredients.find(
    ({ abbreviation }) => value?.unit === abbreviation
  );  

  return (
    <div className="grid gap-x-2 grid-cols-7 mb-4">
      <div className="col-span-2 lg:col-span-2">
        <Select
          value={selectedIngredient}
          options={ingredients}
          onChange={({ abbreviation }) =>
            setFieldValue(`${path}.unit`, abbreviation)
          }
          idFromValue={({ id }) => id}
          labelFromValue={(value) => value?.name}
          components={{
            Control: IngredientSelectControl,
            Option: IngredientSelectOption,
          }}
        />
      </div>
      <div className="col-span-1">
        <Input
          label="Quantity"
          id={`${path}.quantity`}
          name={`${path}.quantity`}
          onChange={handleChange}
          value={value?.quantity}
        />
      </div>
      <div className="col-span-3 lg:col-span-3">
        <Input
          label="Name"
          id={`${path}.name`}
          name={`${path}.name`}
          onChange={handleChange}
          value={value?.name}
        />
      </div>
      <div className="flex col-span-1">
        <Button className="ml-auto" onClick={remove} error>
          <MinusCircleIcon className="w-5 h-5 text-slate-100" />
        </Button>
      </div>
    </div>
  );
}

function IngredientSelectControl({ value }: ISelectControlProps<any>) {
  return (
    <>
      <span className="flex items-center h-5">
        <span className="font-serif italic thin text-gray-400 w-4">
          {value?.abbreviation}
        </span>
        <span className="ml-2 truncate hidden sm:block">{value?.name}</span>
      </span>
      <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
      </span>
    </>
  );
}

function IngredientSelectOption({ active, selected, value }: ISelectOptionProps<any>) {
  return (
    <>
      <div className="flex items-center">
        <span className="font-serif italic thin text-gray-400 w-4">
          {value?.abbreviation}
        </span>
        <span
          className={classNames(
            selected ? "font-semibold" : "font-normal",
            "ml-3 block truncate"
          )}
        >
          {value?.name}
        </span>
      </div>

      {selected ? (
        <span
          className={classNames(
            active ? "text-white" : "text-indigo-600",
            "absolute inset-y-0 right-0 flex items-center pr-4"
          )}
        >
          <CheckIcon className="h-5 w-5" aria-hidden="true" />
        </span>
      ) : null}
    </>
  );
}

type CustomElement = { type: 'paragraph'; children: CustomText[] }
type CustomText = { text: string }

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [
      { text: 'This is editable plain text, just like a <textarea>!' },
    ],
  },
]

function NoteRow() {
  const [value, setValue] = useState<Node[]>(initialValue);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  return (
    <div>
      <Slate editor={editor} value={initialValue}>
        <Editable placeholder="Enter some plain text..." />
      </Slate>
    </div>
  );
}

interface Item {
  id: number;
  text: string;
}

interface IContainerState {
  cards: Item[];
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

function Card({ id, text, index, moveCard }: any) {
  const cardRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: "CARD",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item: DragItem, monitor) {
      if (!cardRef.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselved
      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = cardRef.current?.getBoundingClientRect();

      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveCard(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: "CARD",
    item: () => {
      return { id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drop(cardRef)
  preview(cardRef);
  drag(handleRef);

  // drag(drop(ref));

  return (
    <div
      ref={cardRef}
      className={classNames(
        isDragging && "opacity-25 ring-2 ring-slate-600 ring-offset-8 rounded-sm",
        "bg-white flex items-center"
      )}
      data-handler-id={cardRef}
    >
      <div ref={handleRef} className="p-2 px-1 pr-4" data-handler-id={cardRef}>
        <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
      </div>
      <div>
        {text}
        <NoteRow />
      </div>
      <Button className="ml-auto" error>
        <MinusCircleIcon className="w-5 h-5 text-slate-100" />
      </Button>
    </div>
  );
}

function Steps() {
  const [cards, setCards] = useState([
    { id: 1, text: 'First card' },
    { id: 2, text: 'Second card'},
    { id: 3, text: 'Third card' }
  ]);

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setCards((prevCards: Item[]) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex] as Item],
        ],
      }),
    )
  }, []);

  const renderCard = useCallback(
    (card: { id: number; text: string }, index: number) => {
      return (
        <Card
          key={card.id}
          index={index}
          id={card.id}
          text={card.text}
          moveCard={moveCard}
        />
      )
    },
    []
  );

  return <div className="space-y-6">{cards.map((card, i) => renderCard(card, i))}</div>;
}
