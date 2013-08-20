FactoryGirl.define do
  sequence :user_email do |n|
    # randomize so can restart tests without resetting db
    "user_#{SecureRandom.hex(10)}@example.com"
  end

  sequence :user_token do |n|
    SecureRandom.hex(20)
  end

  factory :user, :class => 'User' do |user|
    user.email { FactoryGirl.generate :user_email }
    user.password "1projectowner"
    user.password_confirmation { |user| user.password }
    user.encrypted_password "$2a$10$YMReaa5SZ22Er/TOCL5AquwhmS8pFgRg/mZuKodcvKeL3QJ5E/n/C"
    user.sign_in_count 6
    user.current_sign_in_at Time.now
    user.last_sign_in_at Time.now
    user.current_sign_in_ip '127.0.0.1'
    user.last_sign_in_ip '127.0.0.1'
    user.authentication_token { FactoryGirl.generate :user_token }
  end

end
