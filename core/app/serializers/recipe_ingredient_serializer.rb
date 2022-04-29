class RecipeIngredientSerializer < ActiveModel::Serializer
  attributes :id,
             :name,
             :quantity,
             :unit,
             :barcode
end
