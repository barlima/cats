class AddDefaultToCatsScore < ActiveRecord::Migration[5.2]
  def change
    change_column :cats, :score, :integer, default: 0
  end
end
