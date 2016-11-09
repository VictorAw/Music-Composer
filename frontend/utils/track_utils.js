export const createTrack = (track, success, error) => {
  $.ajax({
    type: "POST",
    url: "api/tracks",
    data: {track},
    success,
    error
  });
}

export const fetchTrack = (id, success, error) => {
  $.ajax({
    type: "GET",
    url: `api/tracks/${id}`,
    success,
    error
  });
}

export const updateTrack = (track, success, error) => {
  $.ajax({
    type: "PATCH",
    url: `api/tracks/${track.id}`,
    data: {track},
    success,
    error
  });
}

export const deleteTrack = (id, success, error) => {
  $.ajax({
    type: "DELETE",
    url: `api/tracks/${id}`,
    success,
    error
  });
}
