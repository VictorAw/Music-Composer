json.id @user.id
json.username @user.username
json.description @user.description
json.set!(tracks) do
  @user.tracks.each do |track|
    json.extract!(track, :title, :id) 
  end
end
