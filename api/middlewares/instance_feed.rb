require 'faye/websocket'
require 'thread'
require 'json'
require 'rethinkdb'

module Gozer
  class InstanceFeed
    KEEPALIVE_TIME = 15 # in seconds
    CHANNEL        = "chat-demo"

    def initialize(app)
      @app     = app
      @clients = []
      r = RethinkDB::RQL.new
      rdb_config ||= {
          :host => ENV['RDB_HOST'] || '127.0.0.1',
          :port => ENV['RDB_PORT'] || 28015,
          :db   => ENV['RDB_DB']   || 'gozerapi'
      }
      connection = r.connect(:host => rdb_config[:host],
                             :port => rdb_config[:port])

      Thread.new do
        r.db(rdb_config[:db]).table('instance').changes.run(connection).each{|change|
          puts change.to_json
          @clients.each {|ws| ws.send(change.to_json) }
        }
      end

    end

    def call(env)
      if Faye::WebSocket.websocket?(env)
        ws = Faye::WebSocket.new(env, nil, {ping: KEEPALIVE_TIME })
        ws.on :open do |event|
          p [:open, ws.object_id]
          @clients << ws
        end

        # ws.on :message do |event|
        #   p [:message, event.data]
        #   on.message do |channel, msg|
        #     @clients.each {|ws| ws.send(msg) }
        #   end
        # end

        ws.on :close do |event|
          p [:close, ws.object_id, event.code, event.reason]
          @clients.delete(ws)
          ws = nil
        end

        # Return async Rack response
        ws.rack_response

      else
        @app.call(env)
      end
    end

  end
end