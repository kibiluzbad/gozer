require 'rethinkdb'
require 'json'

class GozerApi < Sinatra::Application
  get '/' do
    content_type :json
    r = RethinkDB::RQL.new
    data = r.table('instance')
                        .pluck('cpu', 'disk_usage', 'instance_id', 'processes')
                        .run(@rdb_connection)
    data.to_a.to_json
  end
end