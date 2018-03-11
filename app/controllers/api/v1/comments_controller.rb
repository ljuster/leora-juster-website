class Api::V1::CommentsController < ApplicationController
  def index
    comments = Comment.all.order(:id).reverse
    respond_with @comments
  end

  def show
    @comment = Comment.find(params[:id])
    respond_wtih @comment
  end

  def create
    @comment = Comment.new(comment_params)
    if @comment.save
      render json: @comment, status: 201
    else
      render json: { errors: @comment.errors.full_messages }, status: 422
    end
  end

  private

    def comment_params
      params.require(:comment).permit(:authoer, :comment)
    end
end
