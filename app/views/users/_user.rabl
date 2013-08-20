object @user
attributes :id, :name, :location

if @current_user == @user
  node(:authentication_token) {|u| u.authentication_token}
  node(:email) {|u| u.email}
end