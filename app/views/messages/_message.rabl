object @message
attributes :id, :content, :created_at

node(:user) { |m| partial("users/_user", :object => m.user) }
node(:page) { |m| @current_page}