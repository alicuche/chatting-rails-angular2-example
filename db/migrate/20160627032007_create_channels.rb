class CreateChannels < ActiveRecord::Migration[5.0]
  def change
    create_table :channels do |t|
      t.string :title
      t.references :user
      t.integer :users_count, default: 0
      t.text :description

      t.timestamps
    end
  end
end
