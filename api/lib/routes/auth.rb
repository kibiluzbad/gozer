require 'json'

class GozerApi < Sinatra::Application
  enable :sessions

  def client(token_method = :post)
    OAuth2::Client.new(
        ENV['OAUTH2_CLIENT_ID'] || '4de2fd79af6950291687a9df6f9ab4de93246f020a3e440186bb77fdaba25b0f',
        ENV['OAUTH2_CLIENT_SECRET'] || '6e6009447cfd2d1a0a8792805fd9efa1a6f01c6faa7b7382659b1b1446b57f2a',
        :site         => ENV['SITE'] || "http://localhost:3000",
        :token_method => token_method,
    )
  end

  helpers do
    def is_authenticated? (key)
      puts key
      halt 403 if key.nil?
      token = OAuth2::AccessToken.new(client, key.to_s.sub('Bearer ',''))
      halt 403 unless !token.nil? && !token.expired? && session[:access_token] == token.token
    end
  end


  get '/token' do
    content_type :json

    scope = params[:scope] || "public"
    token = client.client_credentials.get_token(:client_id => '4de2fd79af6950291687a9df6f9ab4de93246f020a3e440186bb77fdaba25b0f', :client_secret => '6e6009447cfd2d1a0a8792805fd9efa1a6f01c6faa7b7382659b1b1446b57f2a', :scope => scope, )
    session[:access_token]  = token.token
    token.to_hash.to_json
  end


end