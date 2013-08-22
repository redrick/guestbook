require 'sanitize'

class Message < ActiveRecord::Base

  belongs_to :user

  validates_presence_of :content, :user_id

  before_save :sanitize_content

  def sanitize_content
    self.content = Sanitize.clean(self.content);
  end

end
