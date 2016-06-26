module ApplicationHelper
  def current_class(test_path)
    request.fullpath == test_path ? 'btn_sticky btn_filled opt_nav_signin' : ''
  end
end
