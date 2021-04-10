class Diy < ApplicationRecord
  belongs_to :user
  belongs_to :category
  has_many :diy_tools
  has_many :tools,through: :diy_tools
  
  @diy.tools.delete(@tool)
  def tools_attributes=(tools)
    tools.each do |t|
      self.tools << Tool.find_or_create_by(name: t)
    end
  end
end
