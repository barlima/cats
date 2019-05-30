class CreateCats < ActiveRecord::Migration[5.2]
  def change
    create_table :cats do |t|
      t.integer :flickr_id
      t.string :flickr_owner
      t.string :title
      t.integer :score

      t.timestamps
    end
  end
end
