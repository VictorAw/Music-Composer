Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do
    resources :users, only: [:index, :create, :update, :show, :destroy]
    resource :session, only: [:create, :destroy]

    resources :tracks, only: [:create, :update, :show, :destroy]
  end

  root :to => "static_pages#root"
end
