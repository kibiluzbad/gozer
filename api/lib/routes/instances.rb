require 'rethinkdb'
require 'json'
require_relative('../../lib/commands/init')
require_relative('../../lib/queries/init')
require_relative('../../lib/models/init')

class GozerApi < Sinatra::Application
  set :sockets, []

  get '/instances' do
    content_type :json
    is_authenticated?(env['HTTP_AUTHORIZATION'])

    query = GetAllInstances.new
    query.execute(connection: @rdb_connection).to_json

  end

  post '/instance' do
    is_authenticated?(env['HTTP_AUTHORIZATION'])
    data = request.body.read
    halt 400 if data.nil?
    params = JSON.parse(data)
    puts params
    save_instance = SaveInstance.new
    instance = Instance.new(cpu: params["cpu"],
                            disk_usage: params["disk_usage"],
                            processes: params["processes"],
                            id: params["id"],
                            os: params["os"],
                            machine_name: params["machine_name"])
    instance.threshold = params["threshold"]

    save_instance.instance(instance: instance)
    save_instance.execute(connection: @rdb_connection)

    save_instance_history = SaveInstanceHistory.new

    instance_history = InstanceHistory.new(cpu: params["cpu"],
                            disk_usage: params["disk_usage"],
                            processes: params["processes"],
                            instance_id: params["id"])

    save_instance_history.instance(instance_history: instance_history)
    save_instance_history.execute(connection: @rdb_connection)

    status 201

  end

  put '/instance/:id' do
    data = JSON.parse(request.body.read)
    is_authenticated?(env['HTTP_AUTHORIZATION'])

    command = SetInstanceThreshold.new
    command.id(id: params[:id])
    command.threshold(threshold: data["threshold"])
    begin
      command.execute(connection: @rdb_connection).to_json
      halt 200
    rescue Exception => err
      p err
      halt 500
    end
  end

  get '/instance/:id/threshold' do
    content_type :json
    is_authenticated?(env['HTTP_AUTHORIZATION'])

    query = GetInstance.new
    query.id(id: params[:id])

    result = query.execute(connection: @rdb_connection)

    result["threshold"].to_s unless result.nil?

  end

end