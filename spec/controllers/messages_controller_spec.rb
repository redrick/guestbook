require 'spec_helper'

describe MessagesController do

  render_views

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

  describe "getting a single message" do
    it "should return a message given an id" do
      get :show, :id => 1, :format => :json
      parsed_body = JSON.parse(response.body)
      parsed_body["id"].should eql 1
    end
  end

  describe "creating a message without being logged in" do

    it "should fail with the appropriate error message" do
      post :create, :message => { :content => "test message"}, :format => :json
      parsed_body = JSON.parse(response.body)
      parsed_body["error"].should eql "You need to sign in or sign up before continuing."
    end

  end

  describe "a message" do

    login_user

    it "should be creatable by a logged in user" do
      post :create, :message => { :content => "test message from logged in user"}, :format => :json
      parsed_body = JSON.parse(response.body)
      parsed_body["content"].should eql "test message from logged in user"
      Message.last.content.should eql "test message from logged in user"
    end

    it "should allow update by the messages's owner" do
      message = @user.messages.create({:content => "test message"})
      post :update, :id => message.id, :message => { :content => "updated!"}, :format => :json
      parsed_body = JSON.parse(response.body)
      parsed_body["content"].should eql "updated!"
      parsed_body["user"]["id"].should eql @user.id
      Message.find(message.id).content.should eql "updated!"
    end

    it "should disallow updates by the non-owners" do
      message = Message.first
      post :update, :id => message.id, :message => { :content => "updated!"}, :format => :json
      parsed_body = JSON.parse(response.body)
      parsed_body["error"].should eql "You do not have permission to modify this message"
    end

    it "should allow deletion by the messages's owner" do
      message = @user.messages.create({:content => "message to delete"})
      delete :destroy, :id => message.id, :format => :json
      Message.find_by_id(message.id).should eql nil
    end

    it "should disallow deletion by the non-owners" do
      message = Message.first
      delete :destroy, :id => message.id, :format => :json
      parsed_body = JSON.parse(response.body)
      parsed_body["error"].should eql "You do not have permission to modify this message"
    end

  end

end