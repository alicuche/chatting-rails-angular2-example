Rails.application.routes.draw do
  root 'chat#index'

  # devise
  devise_for :users

  resources :users, only: [] do
    collection do
      get :current
      post :add_friend
      get 'username/:username', to: 'users#get_by_username'
    end
  end

  resources :messages

  # chatting
  get ':name(/*other)', to: 'chat#index'
end
