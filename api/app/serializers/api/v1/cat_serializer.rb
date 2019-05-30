module Api
  module V1
    class CatSerializer < ActiveModel::Serializer
      attributes :id, :flickr_id, :flickr_owner, :score, :url, :title, :created_at

      def url
        self.object.url
      end

      def score
        # ToDo: remove field from the DB
        self.object.score
      end
    end
  end
end