Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, ENV['KEY'], ENV['SECRET']
end
