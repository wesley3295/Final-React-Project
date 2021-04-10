class CreateDiys < ActiveRecord::Migration[6.1]
  def change
    create_table :diys do |t|
      t.string :title
      t.string :supplies
      t.belongs_to :user, null: false, foreign_key: true
      t.integer :category_id
      t.timestamps
    end
  end
end
