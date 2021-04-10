class CreateDiyTools < ActiveRecord::Migration[6.1]
  def change
    create_table :diy_tools do |t|
      t.belongs_to :diy, null: false, foreign_key: true
      t.belongs_to :tool, null: false, foreign_key: true
      t.timestamps
    end
  end
end
