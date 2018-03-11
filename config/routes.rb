require 'api_constraints'

Rails.application.routes.draw do
  namespace :api do
  namespace :v1 do
    get 'comments/index'
    end
  end

  namespace :api do
  namespace :v1 do
    get 'comments/show'
    end
  end

  namespace :api do
  namespace :v1 do
    get 'comments/create'
    end
  end

  # All controllers available on the following routes:

  # http://api.leora-juster-website.com/v1/...

  namespace :api, defaults: { format: :json}, constains: { subdomain: 'api' }, path: '/' do
    scope module: :v1 do
      resources :comments
    end
  end
end
