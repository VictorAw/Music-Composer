json.id user.id
json.username user.username
json.email user.email
json.description user.description
json.set!(:tracks) do
  json.array!(user.tracks) do |track|
    json.extract!(track, :title, :id) 
  end
end
