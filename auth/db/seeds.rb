25.times do
  Profile.create! :name => Faker::Name.name, :email => Faker::Internet.email, :username => Faker::Internet.user_name
end

User.create! :email => "user@example.com", :password => "doorkeeper", :password_confirmation => "doorkeeper"

app = Doorkeeper::Application.create! :name => "Doorkeeper Sinatra Client", :redirect_uri => "http://doorkeeper-sinatra.herokuapp.com/callback"
connection = ActiveRecord::Base.connection()
connection.execute("INSERT INTO oauth_applications (created_at, name, redirect_uri, secret, uid, updated_at) VALUES ('#{DateTime.now}', 'gozer', 'http://api:9292', '6e6009447cfd2d1a0a8792805fd9efa1a6f01c6faa7b7382659b1b1446b57f2a', '4de2fd79af6950291687a9df6f9ab4de93246f020a3e440186bb77fdaba25b0f', '#{DateTime.now}')")


puts "Application: "
puts "name: #{app.name}"
puts "redirect_uri: #{app.redirect_uri}"
puts "uid: #{app.uid}"
puts "secret: #{app.secret}"
