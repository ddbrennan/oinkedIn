Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :pigs
  resources :pig_pens
  resources :pig_pen_pigs


  mount ActionCable.server => '/cable'

end
