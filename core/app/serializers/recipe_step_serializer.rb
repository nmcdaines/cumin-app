class RecipeStepSerializer < ActiveModel::Serializer
  attributes :id,
             :index,
             :details,
             :timer
end
