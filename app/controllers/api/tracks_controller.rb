class Api::TracksController < ApplicationController
  def create
    @track = Track.new(track_params)
    if @track.save
      if @track.update(channel_params)
        new_times = {start_time: @track.start_time, end_time: @track.end_time}
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
        new_times = {start_time: @track.start_time, end_time: @track.end_time}
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
    @track = Track.includes(channels: {chords: :notes}).find_by_id(params[:id])
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
