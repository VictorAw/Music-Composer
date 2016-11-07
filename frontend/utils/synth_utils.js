function qbeatToS(qbeat, bpm) {
  return (qbeat / 4.0) * (60.0 / bpm);
}

function sToQbeat(s, bpm) {
  return ((s * (bpm / 60.0)) * 4);
}

class Note {
  constructor(ctx,
              freq,
              start_vol, end_vol, 
              start_qbeat, end_qbeat, bpm) {
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
    let start = qbeatToS(start_qbeat, bpm) - currTime;
    let end = qbeatToS(end_qbeat, bpm) - currTime;
    let duration = end - start;

    // Set the start time, end time, and volume of the note
    this.oscillator.start(start);
    this.oscillator.stop(end);
    this.volume.gain.setValueCurveAtTime(vols, start, duration);
  }

  stop() {
    let vols = new Float32Array(2);
    vols[0] = this.volume.gain.value;
    vols[1] = 0;

    this.volume.gain.setValueCurveAtTime(vols, ctx.currentTime, 0.1);
    this.oscillator.stop(ctx.currentTime + 0.1);
  }
}

class Track {
  constructor(trackData) {
    this.bpm = trackData.bpm;

    // Setup noteData 
    this.noteData = [];
    trackData.channels.forEach((track) => {
      track.notes.forEach((note) => {
        noteData.push(note);
      });
    });
   
    noteData.sort((a, b) => {
      if (a.starting_quarter_beat < b.starting_quarter_beat) {
        return -1;
      }
      else if (a.starting_quarter_beat > b.starting_quarteR_beat) {
        return 1;
      }
      else {
        return 0;
      }
    });

    // Set up playback session
    this.reset();
  }

  reset() {
    this.context = new AudioContext();
    this.context.suspend();

    // Start creating playback notes
    this.playQueue = [];
    // Generate new notes every second
    this.playQueueGen = setInterval(() => {
      let dataLength = this.noteData.length;
      let playLength = this.playQueue.length;
      let notesRemaining = dataLength - playLength;
      // Generate notes if there are any left to genereate
      if (notesRemaining > 0) {
        // If there are more than 10k notes to generate, only generate 10k
        let notesToGen = notesRemaining > 10000 ? 10000 : notesReamining;
          for (let i=0; i<notesToGen; i++) {
            let noteData = this.noteData[i];
            // Context, Freq, Volume, Time(start, end, bpm)
            playQueue.push(
              new Note(this.context,
                       this.noteData.freq,
                       this.noteData.start_volume,
                       this.noteData.end_volume,
                       this.noteData.starting_quarter_beat,
                       this.noteData.ending_quarter_beat,
                       this.bpm);
          }
        }, 1000);
    }
  }

  start() {
    this.context.resume();
  }

  stop() {
    // Stop generating new notes
    clearInterval(this.playQueueGen); 

    // Stop all notes
    this.playQueue.forEach((note) => {
      note.stop()
    });
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

export default Track;
