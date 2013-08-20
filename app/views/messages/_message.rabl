object @message
attributes :id, :content, :created_at

child(:user) { attributes :name, :id}
node(:page) { |m| @current_page}