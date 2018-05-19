Rails.application.routes.draw do
  devise_for :users
  root 'billboards#index'
  resources :billboards

  resources :sign_up
end
