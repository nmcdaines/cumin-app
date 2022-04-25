require 'rails_helper'

RSpec.describe RecipeStep, type: :model do
  it { should belong_to(:recipe).class_name(Recipe) }
end
