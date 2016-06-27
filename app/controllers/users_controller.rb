class UsersController < ApplicationController
  respond_to :json
  before_action :authenticate_user!

  def current
    respond_with current_user.as_json(methods: [:friends])
  end

  def add_friend
    user = User.find_by(username: params[:user][:username])
    if user.present? && !current_user.friend?(user)
      Friend.create(user: current_user, friend_to: user)
      Friend.create(user: user, friend_to: current_user)
      success(user.as_json)
    else
      error("can not found user ##{params[:user][:username]}")
    end
  end

  def get_by_username
    user = User.find_by(username: params[:username]) || User.new
    messsages = Message.direct.users(current_user, user)
    success(user.as_json.merge(messages: messsages))
  end

end
