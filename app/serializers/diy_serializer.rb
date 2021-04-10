class DiySerializer < ActiveModel::Serializer
  attributes :id,:created_at, :title, :supplies, :instructions, :user_id, :category_id, :tools, :category, :user

end
