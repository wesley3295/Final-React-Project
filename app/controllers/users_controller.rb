class UsersController < ApplicationController
  before_action :set_user, only: [:update, :destroy]
  before_action :authenicate_user, only: [:show]
  # GET /users
  def index
    @users = User.all

    render json: @users
  end

  # GET /users/1
  def show
    token = encode_token({user_id: @user.id})
      cookies.signed[:jwt] = {value: token, httponly: true, expires: 1.hour.from_now}
      render json: {user: @user, token: token}
  end

  # POST /users
  def create
    @user = User.create(user_params)
    if @user.valid?
      token = encode_token({user_id: @user.id})
      cookies.signed[:jwt] = {value: token, httponly: true, expires: 1.hour.from_now}
      render json: {user: @user, token: token}
    else
      render json: {error: "Invalid username or password"}
    end
  end

  # PATCH/PUT /users/1
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy
  end

  #/login
  def login
    
    @user = User.find_by(username: params[:username])

    if @user && @user.authenticate(params[:password])
      token = encode_token({user_id: @user.id})
      cookies.signed[:jwt] = {value: token, httponly: true, expires: 1.hour.from_now}
      render json: {user: @user, token: token}
      
    else
      render json: {error: "Invalid username or password"}
    end
  end


  def auto_login
    render json: @user
  end
  

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def user_params
      params.require(:user).permit(:username, :password, :email)
    end
end
