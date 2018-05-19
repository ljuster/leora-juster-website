class SignUpController < ApplicationController
  def create
    @user= User.new({ name: params[:name], email: params[:email], encrypted_password: params[:password] })
    if @user.save
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end
end

