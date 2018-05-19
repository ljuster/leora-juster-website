require 'test_helper'

class BillboardsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get billboards_index_url
    assert_response :success
  end

end
