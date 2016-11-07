export const fetchAllUsers = (success, error) => {
  $.ajax({
    type: "GET",
    url: "api/users",
    success,
    error 
  });
}

export const fetchUser = (id, success, error) => {
  $.ajax({
    type: "GET",
    url: `api/users/${id}`,
    success,
    error 
  });
}

export const updateUser = (user, success, error) => {
  $.ajax({
    type: "PATCH",
    url: `api/users/${user.id}`,
    data: user,
    success,
    error 
  });
}

export const deleteUser = (id, success, error) => {
  $.ajax({
    type: "DELETE",
    url: `api/users/${id}`,
    success,
    error 
  });
}


