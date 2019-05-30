module Api
  module V1
    class VotesController < ApplicationController
      before_action :authenticate_user, only: [:create]

      def create
        vote = Vote.new(vote_params.merge({ user_id: current_user.id }))
        if vote.save
          vote.cat.increment!(:score)
          render json: {status: 200, msg: 'Cat chosen!.', errors: vote.errors.messages}
        else
          render json: {status: 409, msg: vote.errors.full_messages}
        end
      end

      private
      
      # Setting up strict parameters for when we add account creation.
      def vote_params
        params.require(:vote).permit(:cat_id)
      end
    end
  end
end
