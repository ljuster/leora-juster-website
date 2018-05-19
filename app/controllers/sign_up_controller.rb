class SignUpController < ApplicationController
  skip_before_filter :authenticate_user!
  layout 'sign_up'

  def index
    # 1) this is the non-authenticed step - when the user click on the registration link and
    #   the flow goes through sign_up#registration_setup
    if current_user.nil? && !session[:registarable_user].nil?
      @user = User.find(session[:registarable_user][:id])

      # 2) This is every other case when the user has completed the first Registration step
    else
      @user = current_user
    end

    if @user.complete? # check if the user has completed the sign up
      redirect_to dashboard_path and return
    end

    @serialized_current_user = UserSerializer.new(@user, {with_org: true, json_show_profiles: true})
    @service_configuration = ServiceConfiguration.new
    @minimized_organizations = @user.min_org_tree
    @supported_currency_symbols = YAML.load_file('lib/currency_symbols.yml').to_json.html_safe

    respond_to do |format|
      format.html
    end

  end

  def registration_setup
    @user = User.with_valid_invitation(params[:invitation_code]).first unless params[:invitation_code].nil?
    redirect = root_path

    unless @user.nil?
      sign_out current_user unless current_user.nil?
      session[:registarable_user] = UserSerializer.new(@user,{json_show_profiles: true}).as_json
      redirect = sign_up_index_path
    end

    redirect_to redirect and return
  end
end

