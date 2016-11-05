class Api::TracksController < ApplicationController
  def create
    @track = Track.new(track_params)
    if @track.save
      if @track.update(channel_params)
        new_times = {start_time: 0, end_time: @track.find_end_time}
        if @track.update(new_times)
          render :show
        else
          render json: @track.errors.full_messages, status: 422
        end
      else
        render json: @track.errors.full_messages, status: 422
      end
    else
      render json: @track.errors.full_messages, status: 422
    end
  end

  def update
    @track = Track.find(params[:id])
    if @track
      if @track.update(track_params) && @track.update(channel_params)
        # Update start time and end time with new note data
        new_times = {start_time: 0, end_time: @track.find_end_time}
        if @track.update(new_times)
          render :show
        else
          render json: @track.errors.full_messages, status: 422
        end
      else
        render json: @track.errors.full_messages, status: 422
      end
    else
      render json: ["Track not found"], status: 404
    end
      
  end

  def show
    # Includes to prevent a ridiculous number of queries (n * m * o)
    # tracks = Track.find_by_sql(
    # "SELECT DISTINCT * FROM ( \
    #   SELECT * FROM tracks \
    #   JOIN channels ON tracks.id = channels.track_id \
    #   JOIN chords ON channels.id = chords.channel_id \
    #   JOIN notes ON chords.id = notes.chord_id \
    #    WHERE tracks.id = #{params[:id]} \
    #    ORDER BY notes.start_time) AS track_data")
    # ActiveRecord::Associations::Preloader.new.preload(@track, channels: {chords: :notes})
    # @track = tracks.select { |track| track.id == params[:id].to_i }[0]
    @track = Track.includes(channels: {chords: :notes}).order("notes.start_time ASC").find_by_id(params[:id])
    #@track = Track.eager_load(channels: {chords: :notes}).order("notes.start_time ASC").find_by_id(params[:id])
    if @track
      render :show 
    else
      render json: ["Track not found"], status: 404
    end
  end

  def destroy
    track = Track.find_by_id(params[:id])
    track.destroy
    render :show 
  end

  private
  def track_params
    params.require(:track).permit(:title, :composer_id)
  end

  def channel_params
    params.require(:track).permit(:channels)
  end
end
