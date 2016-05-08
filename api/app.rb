# encoding: utf-8
require 'sinatra'
require 'rethinkdb'

class GozerApi < Sinatra::Application

  r = RethinkDB::RQL.new
  rdb_config ||= {
      :host => ENV['RDB_HOST'] || '127.0.0.1',
      :port => ENV['RDB_PORT'] || 28015,
      :db   => ENV['RDB_DB']   || 'gozerapi'
  }

  configure :production do
    set :clean_trace, true
  end

  configure :development do
    # ...
  end

  configure do
    set :db, rdb_config[:db]
    begin
      connection = r.connect(:host => rdb_config[:host],
                             :port => rdb_config[:port])
    rescue Exception => err
      puts "Cannot connect to RethinkDB database #{rdb_config[:host]}:#{rdb_config[:port]} (#{err.message})"
      Process.exit(1)
    end

    begin
      r.db_create(rdb_config[:db]).run(connection)
    rescue RethinkDB::RqlRuntimeError => err
      puts "Database `#{rdb_config[:db]}` already exists."
    end

    begin
      r.db(rdb_config[:db]).table_create('instance').run(connection)
    rescue RethinkDB::RqlRuntimeError => err
      puts "Table `instance` already exists."
    ensure
      connection.close
    end
  end

  before do
    begin
      # When opening a connection we can also specify the database:
      @rdb_connection = r.connect(:host => rdb_config[:host], :port =>
          rdb_config[:port], :db => settings.db)
    rescue Exception => err
      logger.error "Cannot connect to RethinkDB database #{rdb_config[:host]}:#{rdb_config[:port]} (#{err.message})"
      halt 501, 'This page could look nicer, unfortunately the error is the same: database not available.'
    end
  end

  # After each request we [close the database connection](http://www.rethinkdb.com/api/ruby/close/).
  after do
    begin
      @rdb_connection.close if @rdb_connection
    rescue
      logger.warn "Couldn't close connection"
    end
  end
end

require_relative 'lib/models/init'
require_relative 'lib/routes/init'