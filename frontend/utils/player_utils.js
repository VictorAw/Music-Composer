export const qbeatToS = (qbeat, bpm) => {
  return (qbeat / 4.0) * (60.0 / bpm);
}

export const sToQbeat = (s, bpm) => {
  return ((s * (bpm / 60.0)) * 4);
}

export class Note {
  constructor(ctx,
              freq,
              start_vol, end_vol, 
              bpm, start_qbeat, end_qbeat=undefined) {
    this.ctx = ctx;
    this.oscillator = ctx.createOscillator();
    this.volume = ctx.createGain();
   
    this.oscillator.connect(this.volume);
    this.volume.connect(ctx.destination);

    // Volume array for gain transition
    let vols = new Float32Array(2);
    vols[0] = start_vol;
    vols[1] = end_vol;

    // Start and end time relative to the currentTime of the context
    // Start, end, duration, and currentTime are in seconds
    let currTime = ctx.currentTime;
    let start = currTime + qbeatToS(start_qbeat, bpm);
    let end = 0;
    let duration = 0;
    if (end_qbeat) {
      end = currTime + qbeatToS(end_qbeat, bpm) - 0.1; // Slight separation of notes
      duration = end - start;
    }

    // Set the oscillator's frequency
    this.oscillator.frequency.value = freq;

    // Set the start time, end time, and volume of the note
    this.oscillator.start(start);
    if (end_qbeat) {
      this.oscillator.stop(end);
      this.volume.gain.setValueCurveAtTime(vols, start, duration);
      this.volume.gain.setValueCurveAtTime(
          new Float32Array([vols[1], 0]), 
          end, 
          0.05
      );
    }
  }

  stop() {
    let vols = new Float32Array(2);
    vols[0] = this.volume.gain.value;
    vols[1] = 0;

    this.volume.gain.cancelScheduledValues(0);
    this.volume.gain.setValueCurveAtTime(vols, this.ctx.currentTime, 0.05);
    this.oscillator.stop(this.ctx.currentTime + 0.05);
  }
}

export class Track {
  constructor(trackData) {
    this.trackData = trackData;
    this.playing = false;
    this.bpm = trackData.bpm;

    // Timing test
    // let cstart = new Date();

    // Setup noteData 
    this.noteData = [];
    trackData.channels_attributes.forEach((channel) => {
      channel.notes_attributes.forEach((note) => {
        this.noteData.push(note);
      });
    });
   
    this.noteData.sort((a, b) => {
      if (a.starting_quarter_beat < b.starting_quarter_beat) {
        return -1;
      }
      else if (a.starting_quarter_beat > b.starting_quarter_beat) {
        return 1;
      }
      else {
        return 0;
      }
    });

    // Timing test
    // let cend = new Date();
    // console.log(`NoteData took ${cend.getTime() - cstart.getTime()} msec`);

    this.bindEventHandlers();

    // Set up playback session
    this.reset();
  }

  bindEventHandlers() {
    this.finish = this.finish.bind(this);
  }

  finish() {
    this.context.close();
    this.playQueue = [];
    this.playing = false;
    if (this.playQueueGen) {
      this.playQueueGen = clearInterval(this.playQueueGen);
    }
  }

  generateNotes() {
    let dataLength = this.noteData.length;
    let playLength = this.playQueue.length;
    let notesRemaining = dataLength - playLength;
    // Generate notes if there are any left to genereate
    if (notesRemaining > 0) {
      // Timing test
      // let pgstart = new Date();
     
      // If there are more than 10k notes to generate, only generate 10k
      let notesToGen = notesRemaining > 10000 ? 10000 : notesRemaining;
      for (let i=0; i<notesToGen; i++) {
        let noteDatum = this.noteData[i];
        // Context, Freq, Volume, Time(start, end, bpm)
        this.playQueue.push(
          new Note(this.context,
            noteDatum.freq,
            noteDatum.start_volume,
            noteDatum.end_volume,
            this.bpm,
            noteDatum.starting_quarter_beat,
            noteDatum.ending_quarter_beat
          )
        );
      }
     
      if (notesToGen < 10000) {
        this.playQueue[this.playQueue.length-1].oscillator.onended = this.finish;
      }
     
      // Timing test 
      // let pgend = new Date();
      // console.log(`PlayQueue generation cycle took ${pgend.getTime() - pgstart.getTime()} ms`);

      return true;
    }
    else if (this.playQueue.length > 0) {
      this.playQueue[this.playQueue.length-1].onended = this.finish;
    }
    
    return false;
  }

  reset() {
    // Timing test
    // let rstart = new Date();

    // Clean up old track state
    this.stop();
    
    // Create new track state
    this.context = new AudioContext();
    // Start creating playback notes
    this.playQueue = [];
 
    // Generate the first round of notes immediately
    // Generate new notes every second if there are still notes to produce
    if (this.generateNotes()) {
      this.playQueueGen = setInterval(() => {
        if (!this.generateNotes()) {
          clearInterval(this.playQueueGen);
        }
      }, 1000);
    }

    // Timing test
    // let rend = new Date();
    // console.log(`Reset took ${rend.getTime() - rstart.getTime()} msec`);

    // Only indicate that the track is playing if there are any notes to play
    if (this.playQueue.length > 0) {
      this.playing = true;
    }
  }

  continuePlay() {
    this.playing = true;
    this.context.resume();
  }

  stop() {
    if (this.playing) {
      // Stop generating new notes
      clearInterval(this.playQueueGen); 

      // Stop all notes
      this.playQueue.forEach((note) => {
        note.stop()
      });

      this.finish();
    }
  }

  pause() {
    this.context.suspend();
  }

  mute() {
    this.playQueue.forEach((note) => {
      note.volume.disconnect();
    });
  }

  unmute() {
    this.playQueue.forEach((note) => {
      note.volume.connect(this.context.destination);
    });
  }
}
