class RemoveScoreFromCats < ActiveRecord::Migration[5.2]
  def change
    remove_column :cats, :score
  end
end
