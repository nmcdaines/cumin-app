class Recipe < ApplicationRecord
  belongs_to :user

  has_many :ingredients, class_name: "RecipeIngredient",dependent: :delete_all
  has_many :steps, class_name: "RecipeStep", dependent: :delete_all

  accepts_nested_attributes_for :ingredients, :allow_destroy => true
  accepts_nested_attributes_for :steps, :allow_destroy => true
end
