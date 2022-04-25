class User < ApplicationRecord
  api_guard_associations refresh_token: 'refresh_tokens'
  has_many :refresh_tokens, dependent: :delete_all

  has_secure_password
end
