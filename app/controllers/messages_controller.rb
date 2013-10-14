class MessagesController < ApplicationController


  before_filter :authenticate_user!, :except => [:new, :show, :index, :count]

  # GET /messages
  # GET /messages.json
  def index

    if params[:user_id]
      @messages = Message.where(:user_id => params[:user_id].to_i)
    else
      @messages = Message.all
    end
    if params[:page] and params[:per_page]
      @messages = @messages.paginate(:per_page=>params[:per_page].to_i,:page=>params[:page].to_i).order("id desc")
      @page = params[:page]
    end

    respond_to do |format|
      format.html # index.html.erb
      format.json { render :messages }
    end
  end

  def count
    respond_to do |format|
      format.html # index.html.erb
      format.json { render :json => {count: Message.count} }
    end
  end

  # GET /messages/1
  # GET /messages/1.json
  def show
    @message = Message.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render :_message }
    end
  end

  # GET /messages/new
  # GET /messages/new.json
  def new
    @message = current_user.messages.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @message }
    end
  end

  # GET /messages/1/edit
  def edit
    @message = current_user.messages.find(params[:id])
    if !@message
      redirect_to_index
    end
  end

  # POST /messages
  # POST /messages.json
  def create

    @message = current_user.messages.new(message_params)

    if @message
      respond_to do |format|
        if @message.save
          # debugger
          format.html do
            redirect_to @message, notice: 'Message was successfully created.'
          end
          format.json { render :_message }
        else
          format.html { render action: "new" }
          format.json { render json: @message.errors, status: :unprocessable_entity }
        end
      end
    end
  end

  # PUT /messages/1
  # PUT /messages/1.json
  def update
    @message = current_user.messages.find_by_id(params[:id])
    if @message
      respond_to do |format|
        if @message.update_attributes(message_params)
          format.html { redirect_to @message, notice: 'Message was successfully updated.' }
          format.json { render :_message }
        else
          format.html { render action: "edit" }
          format.json { render json: @message.errors, status: :unprocessable_entity }
        end
      end
    else
      not_the_owner
    end
  end

  # DELETE /messages/1
  # DELETE /messages/1.json
  def destroy
    @message = current_user.messages.find_by_id(params[:id])
    if @message
      @message.destroy
      respond_to do |format|
        format.html { redirect_to messages_url }
        format.json { head :no_content }
      end
    else
      not_the_owner
    end
  end

  private

  def not_the_owner
    respond_to do |format|
      format.html { redirect_to messages_url }
      format.json { render :json => {:error => "You do not have permission to modify this message"} }
    end
  end

  def message_params
    params.require(:message).permit(:content)
  end
end





