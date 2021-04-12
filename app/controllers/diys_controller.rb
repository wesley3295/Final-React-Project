class DiysController < ApplicationController
  before_action :set_diy, only: [:show, :update, :destroy]
  # before_action :authorized
  # GET /diys
  def index
    @diys = Diy.all

    render json: @diys, exclude: [:updated_at]
  end

  # GET /diys/1
  def show
    render json: @diy
  end

  # POST /diys
  def create   
    #  byebug
    @diy = Diy.new(diy_params)
    if @diy.save
      render json: @diy, status: :created, location: @diy
    else
      render json: @diy.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /diys/1
  def update
    
    if @diy.update(diy_params)
      render json: @diy
    else
      render json: @diy.errors, status: :unprocessable_entity
    end
  end

  # DELETE /diys/1
  def destroy
    @diy.kill_relationships
    @diy.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_diy
      @diy = Diy.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def diy_params
      params.require(:diy).permit(:title, :supplies, {instructions:[]}, :user_id, :category_id,tools_attributes:[])
    end
end
