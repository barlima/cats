class UpdateFlickrIdTypeInCats < ActiveRecord::Migration[5.2]
  def change
    change_column :cats, :flickr_id, :string
    change_column :cats, :score, :integer, default: 0
  end
end
