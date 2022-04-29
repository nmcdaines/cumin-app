class RecipesController < ApplicationController
  before_action :authenticate_and_set_user

  def show
    @recipe = current_user.recipes.find(params[:id])
    render json: @recipe
  end

  def index
    @recipes = current_user.recipes
    render json: @recipes
  end

  def create
    @recipe = Recipe.create create_recipe_params.merge(user: current_user)
    render json: @recipe
  end

  def update
    @recipe = current_user.recipes.find(params[:id])
    @recipe.update(update_recipe_params)
    render json: @recipe
  end

  private

  def create_recipe_params
    params.require(:recipe)
          .permit(
            :title,
            :description,
            ingredients_attributes: [
              :name,
              :quantity,
              :unit,
              :barcode
            ],
            steps_attributes: [
              :index,
              :details
              # timer
            ]
          )
  end

  def update_recipe_params
    params.require(:recipe)
          .permit(
            :title,
            :description,
            ingredients_attributes: [
              :id,
              :name,
              :quantity,
              :unit,
              :barcode,
              :_destroy
            ],
            steps_attributes: [
              :id,
              :index,
              :details,
              :_destroy,
              timer: [
                :h,
                :m,
                :s
              ]
            ]
          )
  end
end
