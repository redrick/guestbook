class UsersController < ApplicationController

  before_filter :authenticate_user!


  # PUT /users/1
  # PUT /users/1.json
  def update
    @user = User.find(params[:id])
    if @user && @user == current_user
      respond_to do |format|
        if @user.update_attributes(user_params)
          format.html { redirect_to @user, notice: 'User was successfully updated.' }
          format.json { render :_user }
        else
          format.html { render action: "edit" }
          format.json { render json: @user.errors, status: :unprocessable_entity }
        end
      end
    else
      redirect_to_index
    end
  end

  # GET /users/1
  # GET /users/1.json
  def show
    @current_user = current_user
    @user = User.find(params[:id])
    respond_to do |format|
      format.html # show.html.erb
      format.json { render :_user }
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :location)
  end
end





