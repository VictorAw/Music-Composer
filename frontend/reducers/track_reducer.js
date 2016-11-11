import { RECEIVE_TRACK,
         ADD_NOTE_TO_TRACK,
         UPDATE_NOTE_IN_TRACK,
         REMOVE_NOTE_FROM_TRACK,
         ADD_CHANNEL_TO_TRACK,
         REMOVE_CHANNEL_FROM_TRACK,
         UPDATE_TITLE} from "../actions/track_actions";
import _ from "lodash";

const _emptyTrack = {
  id: null,
  title: "Untitled Track",
  bpm: 60,
  length: 0,
  channels_attributes: [
    {notes_attributes: []}
  ]
};

const TrackReducer = (oldState=_emptyTrack, action) => {
  Object.freeze(oldState);

  switch(action.type) {
    case RECEIVE_TRACK: {
      return _.merge({}, oldState, action.track);
    }
    case ADD_NOTE_TO_TRACK: {
      let newState = _.merge({}, oldState);
      let ch_idx = action.channel_idx;
      let channel = newState.channels_attributes[ch_idx];
      let notes = channel.notes_attributes;
      let note_idx = notes.findIndex((note) => {
        let next_note_start = note.starting_quarter_beat;
        let curr_note_start = action.note.starting_quarter_beat;
        return next_note_start > curr_note_start;
      });

      notes.splice(note_idx, 0, action.note);
      
      return newState; 
    }
    case UPDATE_NOTE_IN_TRACK: {
      let newState = _.merge({}, oldState);
      let ch_idx = action.channel_idx;
      let channel = newState.channels_attributes[ch_idx];
      let notes = channel.notes_attributes;
      let note_idx = action.note_idx;

      notes[note_idx] = action.note;
 
      return newState;
    }
    case REMOVE_NOTE_FROM_TRACK: {
      let newState = _.merge({}, oldState);
      let ch_idx = action.channel_idx;
      let channel = newState.channels_attributes[ch_idx];
      let notes = channel.notes_attributes;
      let note_idx = action.note_idx; 

      if (notes[note_idx].id) {
        notes[note_idx] = { id: notes[note_idx].id, _destroy: true };
      }
      else {
        notes.splice(note_idx, 1);
      }
  
      return newState;
    }
    case ADD_CHANNEL_TO_TRACK: {
      let newState = _.merge({}, oldState);
      let channels = newState.channels_attributes;
      channels.push(action.channel);
      
      return newState; 
    }
    case REMOVE_CHANNEL_FROM_TRACK: {
      let newState = _.merge({}, oldState);
      let channels = newState.channels_attributes;
      channels.splice(action.channel_idx, 1);

      return newState;
    }
    case UPDATE_TITLE: {
      let newState = _.merge({}, oldState);
      newState.title = action.title;
      
      return newState;
    }
    default: {
      return oldState;
    }
  }
};

export default  TrackReducer;
