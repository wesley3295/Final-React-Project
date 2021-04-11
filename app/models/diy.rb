class Diy < ApplicationRecord
  belongs_to :user
  belongs_to :category
  has_many :diy_tools
  has_many :tools,through: :diy_tools



def kill_relationships
  self.tools.delete_all
end





  def tools_attributes=(tools)
    tools.each do |t|
      self.tools << Tool.find_or_create_by(name: t)
    end
  end
end
