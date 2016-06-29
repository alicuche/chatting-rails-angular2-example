class AddIsRemovedToMessages < ActiveRecord::Migration[5.0]
  def change
    add_column :messages, :is_removed, :boolean, default: false
  end
end
