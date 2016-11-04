export const fetchTrack = (id, success) => {
  $.ajax({
    type: "GET",
    url: `api/tracks/${id}`,
    success
  });
}

export const updateTrack = (track, success) => {
  $.ajax({
    type: "PATCH",
    url: `api/tracks/${track.id}`,
    success
  });
}

export const deleteTrack = (id, success) => {
  $.ajax({
    type: "DELETE",
    url: `api/tracks/${id}`,
    success
  });
}
