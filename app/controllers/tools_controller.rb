class ToolsController < ApplicationController
  before_action :set_tool, only: [:show, :update, :destroy]

  # GET /tools
  def index
    @tools = Tool.all

    render json: @tools
  end

  # GET /tools/1
  def show
    render json: @tool
  end

  # POST /tools
  def create
    @tool = Tool.new(tool_params)

    if @tool.save
      render json: @tool, status: :created, location: @tool
    else
      render json: @tool.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /tools/1
  def update
    if @tool.update(tool_params)
      render json: @tool
    else
      render json: @tool.errors, status: :unprocessable_entity
    end
  end

  # DELETE /tools/1
  def destroy
    @tool.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_tool
      @tool = Tool.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def tool_params
      params.require(:tool).permit(:name, :diy_id)
    end
end
