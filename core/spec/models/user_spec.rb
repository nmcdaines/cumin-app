require 'rails_helper'

RSpec.describe User, type: :model do
  it { should have_many(:refresh_tokens) }
  it { should have_secure_password }
  
  it { should have_many(:recipes) }
end
