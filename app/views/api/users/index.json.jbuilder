@users.each do |user|
  json.array! do
    json.extract!(user, :id, :username)
  end
end
