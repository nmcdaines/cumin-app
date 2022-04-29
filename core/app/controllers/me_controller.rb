class MeController < ApplicationController
  before_action :authenticate_and_set_user

  def index
    render json: current_user,
           serializer: MeSerializer
  end
end
