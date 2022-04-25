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
  
end
