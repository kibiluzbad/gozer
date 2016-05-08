require 'rest-client'
require 'json'
require_relative('instance')

class InstanceJob

  def self.perform(instance)
    response = get_token
    raise('Cannot get token') unless response.code == 200
    token = JSON.parse(response)
    response = save_instance(instance, token)
    raise("Failed to save instance data, #{response.code}") unless response.code == 201
  end


  private

  def self.get_token_url
    ENV['TOKEN_URL'] || 'http://localhost:9292/token'
  end

  def self.get_api_instances_endpoint
    (ENV['API_URL'] || 'http://localhost:9292') + '/instance'
  end

  def self.get_client_id
    ENV['OAUTH2_CLIENT_ID'] || '4de2fd79af6950291687a9df6f9ab4de93246f020a3e440186bb77fdaba25b0f'
  end

  def self.get_client_secret
    ENV['OAUTH2_CLIENT_SECRET'] || '6e6009447cfd2d1a0a8792805fd9efa1a6f01c6faa7b7382659b1b1446b57f2a'
  end

  def self.get_token
    RestClient.post get_token_url, {:client_id => get_client_id, :client_secret => get_client_secret}.to_json, :content_type => :json, :accept => :json
  end

  def self.format_token_header(token)
    'Bearer ' + token['access_token']
  end

  def self.save_instance(instance, token)

    url = get_api_instances_endpoint

    RestClient::Request.execute(method: :post, url: url,
                                payload: instance, headers: {authorization: format_token_header(token)})

  end

end