module Api
  module V1
    class CatsController < ApplicationController
      before_action :authenticate_user, only: [:index, :pair, :top_ten]

      DAY = 'day'.freeze
      WEEK = 'week'.freeze
      MONTH = 'month'.freeze

      def index
        render json: Cat.all, each_serializer: Api::V1::CatSerializer
      end

      def pair
        cat1 = Cat.order("RANDOM()").find { |cat| !cat.users.include?(current_user) }
        cat2 = Cat.order("RANDOM()").find { |cat| !cat.users.include?(current_user) && cat.id != cat1.id }

        if(cat1 && cat2)
          render json: [cat1, cat2], each_serializer: Api::V1::CatSerializer
        else
          render json: []
        end
      end

      def top_ten
        case params[:last]
        when DAY
          cats = Cat.where("created_at > ?", 1.day.ago)
        when WEEK
          cats = Cat.where("created_at > ?", 1.week.ago)
        when MONTH
          cats = Cat.where("created_at > ?", 1.month.ago)
        else
          cats = Cat.all
        end

        render json: cats.order(score: :desc).first(10), each_serializer: Api::V1::CatSerializer
      end
    end
  end
end
