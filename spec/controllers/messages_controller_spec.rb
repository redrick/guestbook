require 'spec_helper'

describe MessagesController do
  integrate_views

  DatabaseCleaner.clean

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

  describe "getting messages by page" do

    it "should return the 5 most recent messages when per_page is 5" do
      get :index, :per_page => 5, :page => 1, :format => :json
      parsed_body = JSON.parse(response.body)
      parsed_body.count.should eql 5
      parsed_body.last["content"].should eql "test message 6"
    end

    it "should return the next 5 most recent messages on page 2" do
      get :index, :per_page => 5, :page => 2, :format => :json
      parsed_body = JSON.parse(response.body)
      parsed_body.count.should eql 5
      parsed_body.last["content"].should eql "test message 1"
    end

  end

  describe "getting messages by user" do

    it "should return only the user's messages" do
      get :index, :user_id => 1, :format => :json
      parsed_body = JSON.parse(response.body)
      parsed_body.count.should eql 1
      parsed_body.last["user"]["id"].should eql 1
    end

  end

  describe "getting message count" do

    it "should return correct count of all messages in the database" do
      get :count, :format => :json
      parsed_body = JSON.parse(response.body)
      parsed_body["count"].should eql 10
    end

  end




end