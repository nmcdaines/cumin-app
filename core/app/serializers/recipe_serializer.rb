class RecipeSerializer < ActiveModel::Serializer
  attributes :id,
             :title,
             :description

  belongs_to :user
  has_many :steps
  has_many :ingredients
end
