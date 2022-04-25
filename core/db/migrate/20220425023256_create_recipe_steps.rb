class CreateRecipeSteps < ActiveRecord::Migration[7.0]
  def change
    create_table :recipe_steps do |t|
      t.belongs_to :recipe, null: false, foreign_key: true
      t.integer :index
      t.string :details
      t.json :timer

      t.timestamps
    end
  end
end
