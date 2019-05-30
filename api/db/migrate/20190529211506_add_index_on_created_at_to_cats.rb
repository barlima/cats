class AddIndexOnCreatedAtToCats < ActiveRecord::Migration[5.2]
  def change
    add_index :cats, :created_at
  end
end
