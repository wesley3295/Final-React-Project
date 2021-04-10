class Tool < ApplicationRecord
  has_many :diy_tools
  has_many :diys,through: :diy_tools
  
end
