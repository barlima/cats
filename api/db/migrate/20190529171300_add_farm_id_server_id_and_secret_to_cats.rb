class AddFarmIdServerIdAndSecretToCats < ActiveRecord::Migration[5.2]
  def change
    add_column :cats, :farm_id, :string
    add_column :cats, :server_id, :string
    add_column :cats, :secret, :string
  end
end
