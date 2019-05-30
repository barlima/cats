class AddScoreToCats < ActiveRecord::Migration[5.2]
  def change
    add_column :cats, :score, :integer
    add_index :cats, :score
  end
end
