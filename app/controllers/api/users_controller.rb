class Api::UsersController < ApplicationController
  def index
    @users = User.all
    render :index
  end

  def create
    @user = User.new(user_params)
    
    if @user.save
      login(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def update
    @user = User.find_by_id(params[:id])
    if @user
      if @user == current_user
        if @user.update(user_params)
          render :show
        else
          render json: @user.errors.full_messages, status: 422
        end
      else
        render json: ["Cannot edit other users' profiles"], status: 401
      end
    else
        render json: ["User not found"], status: 404
    end
  end

  def show
    @user = User.includes(:tracks).find_by_id(params[:id])
    if @user
      render :show
    else
      render json: ["User not found"], status: 404
    end
  end

  def destroy
    logout
    current_user.destroy
    render :show
  end 

  private
  def user_params
    params.require(:user).permit(:username, :email, :password, :description)
  end
end
