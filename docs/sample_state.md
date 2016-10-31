```js
{
  currentUser: {
    id: 1,
    username: "victor_aw"
  },
  forms: {
    signUp: { errors: [] },
    logIn: { errors: [] }
  },
  description: {
    user_id: 1,
    body: "I'm a hobbyist music composer."
  },
  tracks: {
    1: {
      title: "Untitled",
      composer_id: 1,
      notes: {
        0: [],
        1: [],
        2: [],
        3: []
      } 
    },
    2: {
      title: "My First Track",
      composer_id: 1,
      notes: {
        1: [{ // A440 for 1.5s going from 25% volume to 100% volume
            start_time: 0,
            end_time: 1500,
            freq: 440,
            start_vol: 25,
            end_vol: 100
          }, { // Empty note/Rest
            start_time: 1500,
            end_time: 2000,
            freq: 0,
            start_vol: 0,
            end_vol: 0
          }, {
            start_time: 2000,
            end_time: 2500,
            freq: 400,
            start_vol: 100,
            end_vol: 0 
          }],
        2: [{
            start_time: 0,
            end_time: 2500,
            freq: 0,
            start_vol: 0,
            end_vol: 0
          }], 
        3: [{
            start_time: 0,
            end_time: 2500,
            freq: 220,
            start_vol: 100,
            end_vol: 100
          }], 
        4: [{
            start_time: 0,
            end_time: 2500,
            freq: 0,
            start_vol: 0,
            end_vol: 0
          }]
        }
      }
    }
  }
}
