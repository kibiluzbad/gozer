require 'rethinkdb'
require 'json'
require_relative('../../lib/commands/init')
require_relative('../../lib/queries/init')

class GozerApi < Sinatra::Application
  get '/instances' do
    content_type :json
    is_authenticated?(env['HTTP_AUTHORIZATION'])

    query = GetAllInstances.new
    query.execute(connection: @rdb_connection).to_json
  end

  post '/instance' do
    content_type :json
    #TODO: save instance data
  end

  delete '/instance' do
    content_type :json
    #TODO: delete instance data
  end
end