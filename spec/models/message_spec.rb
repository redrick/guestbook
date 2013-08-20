require 'spec_helper'

describe Message do

  describe "when being validated" do
    it { should validate_presence_of(:content) }
    it { should validate_presence_of(:user_id) }
    it { should belong_to(:user) }
    it { should_not allow_mass_assignment_of(:user_id) }
  end

  describe "when adding a message" do
    it "should increment message count" do
      expect {
        message = Message.new({:content => "test"})
        message.user_id = 1;
        message.save
      }.to change(Message, :count).by(1)
      Message.first.content.should eql("test")
    end

  end

end