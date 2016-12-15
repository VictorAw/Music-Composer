// Math constants and mappings
// Mapping of all frequencies to get instant lookup
export const NOTE_NAME_TO_FREQ = {
  "A0": 27.50, "Bb0": 29.14, "B0": 30.87, 
  "C1": 32.70, "C#1": 34.65, "D1": 36.71, 
    "Eb1": 38.89, "E1": 41.20, "F1": 43.65, 
    "F#1": 46.25, "G1": 49.00, "Ab1": 51.91, 
    "A1": 55.00, "Bb1": 58.27, "B1": 61.74,
  "C2": 65.41, "C#2": 69.30, "D2": 73.42, 
    "Eb2": 77.78, "E2": 82.41, "F2": 87.31, 
    "F#2": 92.50, "G2": 98.00, "Ab2": 103.83, 
    "A2": 110.00, "Bb2": 116.54, "B2": 123.47,
  "C3": 130.81, "C#3": 138.59, "D3": 146.83, 
    "Eb3": 155.56, "E3": 164.81, "F3": 174.61, 
    "F#3": 185.00, "G3": 196.00, "Ab3": 207.65, 
    "A3": 220.00, "Bb3": 233.08, "B3": 246.94,
  "C4": 261.63, "C#4": 277.18, "D4": 293.66, 
    "Eb4": 311.13, "E4": 329.63, "F4": 349.23, 
    "F#4": 369.99, "G4": 392.00, "Ab4": 415.30, 
    "A4": 440.00, "Bb4": 466.16, "B4": 493.88,
  "C5": 523.25, "C#5": 554.37, "D5": 587.33, 
    "Eb5": 622.25, "E5": 659.25, "F5": 698.46, 
    "F#5": 739.99, "G5": 783.99, "Ab5": 830.61, 
    "A5": 880.00, "Bb5": 932.33, "B5": 987.77,
  "C6": 1046.50, "C#6": 1108.73, "D6": 1174.66, 
    "Eb6": 1244.51, "E6": 1318.51, "F6": 1396.91, 
    "F#6": 1479.98, "G6": 1567.98, "Ab6": 1661.22, 
    "A6": 1760.00, "Bb6": 1864.66, "B6": 1975.53,
  "C7": 2093.00, "C#7": 2217.46, "D7": 2349.32, 
    "Eb7": 2489.02, "E7": 2637.02, "F7": 2793.83, 
    "F#7": 2959.96, "G7": 3135.96, "Ab7": 3322.44, 
    "A7": 3520.00, "Bb7": 3729.31, "B7": 3951.07,
  "C8": 4186.01
};

export const FREQ_TO_NOTE_NAME = {
  "27.5": "A0", "29.14": "Bb0", "30.87": "B0", 
  "32.7": "C1", "34.65": "C#1", "36.71": "D1", 
    "38.89": "Eb1", "41.2": "E1", "43.65": "F1", 
    "46.25": "F#1", "49": "G1", "51.91": "Ab1", 
    "55": "A1", "58.27": "Bb1", "61.74": "B1", 
  "65.41": "C2", "69.3": "C#2", "73.42": "D2", 
    "77.78": "Eb2", "82.41": "E2", "87.31": "F2", 
    "92.5": "F#2", "98": "G2", "103.83": "Ab2", 
    "110": "A2", "116.54": "Bb2", "123.47": "B2", 
  "130.81": "C3", "138.59": "C#3", "146.83": "D3", 
    "155.56": "Eb3", "164.81": "E3", "174.61": "F3", 
    "185": "F#3", "196": "G3", "207.65": "Ab3", 
    "220": "A3", "233.08": "Bb3", "246.94": "B3", 
  "261.63": "C4", "277.18": "C#4", "293.66": "D4", 
    "311.13": "Eb4", "329.63": "E4", "349.23": "F4", 
    "369.99": "F#4", "392": "G4", "415.3": "Ab4", 
    "440": "A4", "466.16": "Bb4", "493.88": "B4", 
  "523.25": "C5", "554.37": "C#5", "587.33": "D5", 
    "622.25": "Eb5", "659.25": "E5", "698.46": "F5", 
    "739.99": "F#5", "783.99": "G5", "830.61": "Ab5", 
    "880": "A5", "932.33": "Bb5", "987.77": "B5", 
  "1046.5": "C6", "1108.73": "C#6", "1174.66": "D6", 
    "1244.51": "Eb6", "1318.51": "E6", "1396.91": "F6", 
    "1479.98": "F#6", "1567.98": "G6", "1661.22": "Ab6", 
    "1760": "A6", "1864.66": "Bb6", "1975.53": "B6", 
  "2093": "C7", "2217.46": "C#7", "2349.32": "D7", 
    "2489.02": "Eb7", "2637.02": "E7", "2793.83": "F7", 
    "2959.96": "F#7", "3135.96": "G7", "3322.44": "Ab7", 
    "3520": "A7", "3729.31": "Bb7", "3951.07": "B7", 
  "4186.01": "C8"
};

export const ROW_IDX_TO_NOTE_NAME = [
  "C8", "B7", "Bb7", "A7", "Ab7", "G7", "F#7", "F7", "E7", "Eb7", "D7", "C#7", 
  "C7", "B6", "Bb6", "A6", "Ab6", "G6", "F#6", "F6", "E6", "Eb6", "D6", "C#6", 
  "C6", "B5", "Bb5", "A5", "Ab5", "G5", "F#5", "F5", "E5", "Eb5", "D5", "C#5", 
  "C5", "B4", "Bb4", "A4", "Ab4", "G4", "F#4", "F4", "E4", "Eb4", "D4", "C#4", 
  "C4", "B3", "Bb3", "A3", "Ab3", "G3", "F#3", "F3", "E3", "Eb3", "D3", "C#3", 
  "C3", "B2", "Bb2", "A2", "Ab2", "G2", "F#2", "F2", "E2", "Eb2", "D2", "C#2", 
  "C2", "B1", "Bb1", "A1", "Ab1", "G1", "F#1", "F1", "E1", "Eb1", "D1", "C#1", 
  "C1", "B0", "Bb0", "A0"
];

export const NOTE_NAME_TO_ROW_IDX = {
  "A0": 87, "Bb0": 86, "B0": 85, 
  "C1": 84, "C#1": 83, "D1": 82, 
  "Eb1": 81, "E1": 80, "F1": 79, 
  "F#1": 78, "G1": 77, "Ab1": 76, 
  "A1": 75, "Bb1": 74, "B1": 73,
  "C2": 72, "C#2": 71, "D2": 70, 
  "Eb2": 69, "E2": 68, "F2": 67, 
  "F#2": 66, "G2": 65, "Ab2": 64, 
  "A2": 63, "Bb2": 62, "B2": 61,
  "C3": 60, "C#3": 59, "D3": 58, 
  "Eb3": 57, "E3": 56, "F3": 55, 
  "F#3": 54, "G3": 53, "Ab3": 52, 
  "A3": 51, "Bb3": 50, "B3": 49,
  "C4": 48, "C#4": 47, "D4": 46, 
  "Eb4": 45, "E4": 44, "F4": 43,
  "F#4": 42, "G4": 41, "Ab4": 40, 
  "A4": 39, "Bb4": 38, "B4": 37,
  "C5": 36, "C#5": 35, "D5": 34, 
  "Eb5": 33, "E5": 32, "F5": 31, 
  "F#5": 30, "G5": 29, "Ab5": 28, 
  "A5": 27, "Bb5": 26, "B5": 25,
  "C6": 24, "C#6": 23, "D6": 22, 
  "Eb6": 21, "E6": 20, "F6": 19, 
  "F#6": 18, "G6": 17, "Ab6": 16, 
  "A6": 15, "Bb6": 14, "B6": 13,
  "C7": 12, "C#7": 11, "D7": 10, 
  "Eb7": 9, "E7": 8, "F7": 7, 
  "F#7": 6, "G7": 5, "Ab7": 4, 
  "A7": 3, "Bb7": 2, "B7": 1,
  "C8": 0
};

function overlapsLeft(newNote, otherNote) {
  return (newNote.starting_quarter_beat < otherNote.starting_quarter_beat &&
          newNote.ending_quarter_beat > otherNote.starting_quarter_beat);
}

function overlapsRight(newNote, otherNote) {
  return (newNote.starting_quarter_beat < otherNote.ending_quarter_beat &&
          newNote.ending_quarter_beat > otherNote.ending_quarter_beat);
}

function contains(newNote, otherNote) {
  return (newNote.starting_quarter_beat < otherNote.starting_quarter_beat &&
          newNote.ending_quarter_beat > otherNote.ending_quarter_beat);
}

function overlays(newNote, otherNote) {
  return (newNote.starting_quarter_beat === otherNote.starting_quarter_beat &&
          newNote.ending_quarter_beat === otherNote.ending_quarter_beat);
}

export const overlappingNote = (newNote, noteIdx, notes) => {
  for (let idx=0; idx<notes.length; idx++) {
    let otherNote = notes[idx];
    if (otherNote.freq === newNote.freq &&
        idx !== noteIdx &&
        (overlapsLeft(newNote, otherNote) ||
         overlapsRight(newNote, otherNote) ||
         overlays(newNote, otherNote) ||
         contains(newNote, otherNote))
       ) {
      return true;
    }
  }

  return false;
}

