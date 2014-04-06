Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, ENV['1462721863960319'], ENV['SECRET']
end
