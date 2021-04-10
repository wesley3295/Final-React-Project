class AddInstructionsToDiy < ActiveRecord::Migration[6.1]
  def change
    add_column :diys, :instructions, :text, array:true, default: []
    add_column :diys, :instructions, :text, array:true, default: []
  end
end
