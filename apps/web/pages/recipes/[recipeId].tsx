import { useRouter } from "next/router";
import { useQuery } from "react-query";
// import { auth } from "data";
import { auth, recipe } from "data";

import { useLogin } from "../../context/AuthContext";

import { DefaultLayout } from "web/layouts/default-layout";
import { RecipeModal } from "web/components/recipe-modal";
import { RecipeCard } from "web/components/recipe-card";
import { Button, FormSection, FormSectionDivider } from "ui";

export default function Web() {
  const router = useRouter();
  const { recipeId } = router.query;

  const { isLoading, error, data } = useQuery(
    ["recipe", recipeId],
    async () => {
      if (recipeId) {
        const { data }: any = await recipe.get(recipeId);
        return data;
      }

      return {};
    }
  );

  console.log(isLoading, error, data);

  if (isLoading) {
    return <div>Loading</div>
  }

  if (!data) {
    return <div>Not found</div>
  }

  return (
    <DefaultLayout>
      <div>
        <button onClick={() => router.back()}>Back</button>
      </div>

      {/* <div>{JSON.stringify(data || {})}</div> */}

      <div className="py-8 px-4 flex justify-center">
        <div className="w-full max-w-5xl">
          <div>ID: {data.id}</div>
          <div>Title: {data.title}</div>
          <div>Description: {data.description}</div>
          <div>
            Ingredients:
            {data.ingredients?.map((item: any) => {
              return (
                <div className="pl-4">
                  <div>ID: {item.id}</div>
                  <div>Name: {item.name}</div>
                  <div>Quantity: {item.quantity}</div>
                  <div>Unit: {item.unit}</div>
                  <div>Barcode: {item.barcode}</div>
                </div>
              );
            })}
          </div>
          <div>
            Steps:
            {data.steps?.map((item: any) => {
              return (
                <div className="pl-4">
                  <div>ID: {item.id}</div>
                  <div>Details: {item.details}</div>
                  <div>Timer: {JSON.stringify(item.timer || {})}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="py-8 px-4 flex justify-center">
        <div className="w-full max-w-5xl">
          <FormSection />
          <FormSectionDivider />
          <FormSection />
        </div>
      </div>
    </DefaultLayout>
  );
}
