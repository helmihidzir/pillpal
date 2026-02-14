# frozen_string_literal: true

class UsersController < InertiaController
  skip_before_action :authenticate, only: %i[new create]
  before_action :require_no_authentication, only: %i[new create]

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    @user.verified = true

    if @user.save
      session_record = @user.sessions.create!
      cookies.signed.permanent[:session_token] = {value: session_record.id, httponly: true}

      redirect_to after_sign_up_path, notice: "Welcome! You have signed up successfully"
    else
      redirect_to sign_up_path, inertia: {errors: @user.errors}
    end
  end

  def destroy
    user = Current.user
    if user.authenticate(params[:password_challenge] || "")
      user.destroy!
      Current.session = nil
      redirect_to root_path, notice: "Your account has been deleted", inertia: {clear_history: true}
    else
      redirect_to settings_profile_path, inertia: {errors: {password_challenge: "Password challenge is invalid"}}
    end
  end

  private

  def user_params
    params.permit(:email, :name, :password, :password_confirmation, :role)
  end

  def after_sign_up_path
    @user.caregiver? ? caregivers_path : medications_path
  end
end
