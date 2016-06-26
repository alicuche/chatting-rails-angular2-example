Rails.application.routes.draw do
  root 'chat#index'

  # devise
  devise_for :users

  get 'users/current', to: 'users#current'

  # chatting
  get ':name', to: 'chat#index'
end
