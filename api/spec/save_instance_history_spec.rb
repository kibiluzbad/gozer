require('rethinkdb')
require_relative('../lib/commands/save_instance_history')
require_relative('../lib/models/instance_history')

describe SaveInstanceHistory do

  let(:r) { RethinkDB::RQL.new }
  let(:rdb_config) { {
      :host => '127.0.0.1',
      :port => 28015,
      :db   => 'gozertestapi'
  } }

  before(:each) do

    begin
      @connection = r.connect(:host => rdb_config[:host],
                              :port => rdb_config[:port])
    rescue Exception => err
      puts "Cannot connect to RethinkDB database #{rdb_config[:host]}:#{rdb_config[:port]} (#{err.message})"
      Process.exit(1)
    end

    begin
      r.db_create(rdb_config[:db]).run(@connection)
      @connection.use(rdb_config[:db])
    rescue RethinkDB::RqlRuntimeError => err
      @connection.use(rdb_config[:db])
      puts "Database `#{rdb_config[:db]}` already exists."
    end

    begin
      r.db(rdb_config[:db]).table_create('instance_history').run(@connection)
    rescue RethinkDB::RqlRuntimeError => err
      puts "Table `instance` already exists."
    end

  end

  after(:each) do

    begin
      r.db_drop(rdb_config[:db]).run(@connection)
    rescue RethinkDB::RqlRuntimeError => err
      puts "Cannot drop database `#{rdb_config[:db]}`."
    ensure
      @connection.close
    end

  end


  let(:instance_history) { InstanceHistory.new(cpu: 10, disk_usage: 5, processes: %w(process1 process2), instance_id: 'i-035a444f5943facc8') }

  it 'creates record in rethinkdb' do

    command = SaveInstanceHistory.new
    command.instance(instance_history: instance_history)
    command.execute(connection: @connection)

    instanceSaved = r.table('instance_history')
                        .filter({"instance_id" => instance_history.instance_id})
                        .pluck('cpu','created_at','disk_usage','instance_id','processes')
                        .run(@connection)

    expect(instanceSaved.to_a[0]).to match(instance_history.to_hash)
  end
end