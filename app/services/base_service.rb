class BaseService

  attr_accessor :current_user, :params

  def initialize user = nil, params = {}
    @current_user = user
    @params       = params
  end

end