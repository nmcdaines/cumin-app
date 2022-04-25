Rails.application.routes.draw do
  api_guard_routes for: 'users', path: 'auth'


  api_guard_scope 'users' do
    post '/api/auth/register' => 'api_guard/registration#create'
    # delete '/api/auth/delete' => 'api_guard/registration#destroy'

    post '/api/auth/login' => 'api_guard/authentication#create'
    delete '/api/auth/logout' => 'api_guard/authentication#destroy'

    post '/api/auth/refresh' => 'api_guard/tokens#create'
    delete '/api/auth/change_password' => 'api_guard/passwords#destroy'
  end

  scope '/api' do
    resources :recipes, only: [:index, :show]
  end

  get '/recipes', to: 'recipes#index'
end
