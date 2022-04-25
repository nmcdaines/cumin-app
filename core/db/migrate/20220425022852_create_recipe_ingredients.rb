class CreateRecipeIngredients < ActiveRecord::Migration[7.0]
  def change
    create_table :recipe_ingredients do |t|
      t.belongs_to :recipe, null: false, foreign_key: true
      t.string :name
      t.float :quantity
      t.string :unit
      t.string :barcode

      t.timestamps
    end
  end
end
