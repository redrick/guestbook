FactoryGirl.define do
  sequence :message_content do |n|
    "test message #{n}"
  end

  factory :message, :class => 'Message' do |message|
    message.content { FactoryGirl.generate :message_content }
    message.association :user, :factory => :user
  end

end
