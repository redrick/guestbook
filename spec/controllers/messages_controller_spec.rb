require 'spec_helper'

describe MessagesController do
  integrate_views

  messages = []
  10.times do
    messages.push FactoryGirl.create(:message)
  end

  describe "getting all messages" do



    it "should return all messages" do
      get :index, :format => :json
      parsed_body = JSON.parse(response.body)
      parsed_body.count.should eql 10
      parsed_body.last["content"].should eql "test message 10"
    end
  end

  describe "getting 1 page of messages" do

    it "should return 5 messages" do
      get :index, :per_page => 5, :page => 1, :format => :json
      parsed_body = JSON.parse(response.body)
      parsed_body.count.should eql 5
      parsed_body.last["content"].should eql "test message 6"
    end
  end

end