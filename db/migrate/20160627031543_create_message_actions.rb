class CreateMessageActions < ActiveRecord::Migration[5.0]
  def change
    create_table :message_actions do |t|
      t.references :message
      t.references :user
      t.string :action
      t.string :content

      t.timestamps
    end
  end
end
