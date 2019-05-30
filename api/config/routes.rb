Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
      # Users
      post 'user_token' => 'user_token#create'

      get    '/users'          => 'users#index'
      get    '/users/current'  => 'users#current'
      post   '/users/create'   => 'users#create'
      patch  '/user/:id'       => 'users#update'
      delete '/user/:id'       => 'users#destroy'

      get    '/cats'           => 'cats#index'
      get    '/cats_pair'      => 'cats#pair'
      get    '/cats/top_ten'   => 'cats#top_ten'

      post   '/vote'           => 'votes#create'

      get    '/statistics'     => 'statistics#index'
    end
  end
end
