require 'rails_helper'

RSpec.describe Recipe, type: :model do
  it { should belong_to(:user).class_name(User) }
  it { should have_many(:ingredients).class_name("RecipeIngredient") }
  it { should have_many(:steps).class_name("RecipeStep")}
end
