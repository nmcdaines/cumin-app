class Recipe < ApplicationRecord
  belongs_to :user

  has_many :ingredients, class_name: "RecipeIngredient"
  has_many :steps, class_name: "RecipeStep"
end
