class UsersController < ApplicationController

  before_filter :authenticate_user!, :except => [:new, :show, :index]

  # GET /users
  # GET /users.json
  def index
    @current_user = current_user
    @users = User.all
    respond_to do |format|
      format.html # index.html.erb
      format.json { render :users }
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

  # GET /users/new
  # GET /users/new.json
  def new
    @user = User.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @user }
    end
  end

  # GET /users/1/edit
  def edit
    @user = current_user
    if !@user
      redirect_to_index
    end
  end


  # PUT /users/1
  # PUT /users/1.json
  def update
    @user = User.find(params[:id])
    if @user && @user == current_user
      respond_to do |format|
        if @user.update_attributes(user_params)
          format.html { redirect_to @user, notice: 'User was successfully updated.' }
          format.json { head :no_content }
        else
          format.html { render action: "edit" }
          format.json { render json: @user.errors, status: :unprocessable_entity }
        end
      end
    else
      redirect_to_index
    end
  end

  # DELETE /users/1
  # DELETE /users/1.json
  def destroy
    @user = current_user.find(params[:id])
    if @user
      @user.destroy
      respond_to do |format|
        format.html { redirect_to users_url }
        format.json { head :no_content }
      end
    else
      redirect_to_index
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :location)
  end
end





