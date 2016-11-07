class Api::PlayersController < ApplicationController
  def index
    # Takes a track as a param and returns all the notes in that track sorted by start_qbeat
  end

  private
  def player_params
    params.require(:track)
end
