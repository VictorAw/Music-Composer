class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_username(session_params[:username])
    if @user
      if @user.is_password?(session_params[:password])
        login(@user)
        render "api/users/show"
      else
        render json: ["Incorrect password"], status: 401
      end
    else
      render json: ["Username not found"], status: 401
    end 
  end

  def destroy
    if current_user
      @user = current_user
      logout
      render "api/users/show"
    else
      render json: ["Nobody signed in"], status: 404
    end
  end

  private
  def session_params
    params.require(:user).permit(:username, :password)
  end
end
