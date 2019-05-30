module Api
  module V1
    class StatisticsController < ApplicationController
      before_action :authenticate_user, only: [:index]
      before_action :authorize_as_admin, only: [:index]

      def index
        render json: {
          users_total: User.total,
          active_users: User.total_active,
          users_avg: User.avg_votes,
          cats_total: Cat.total,
          cats_avg: Cat.avg_votes
        }
      end
    end
  end
end
