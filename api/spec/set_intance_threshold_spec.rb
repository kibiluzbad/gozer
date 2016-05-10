require('rethinkdb')
require_relative('../lib/commands/set_instance_threshold')
require_relative('../lib/models/instance')

describe SetInstanceThreshold do

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
      r.db(rdb_config[:db]).table_create('instance').run(@connection)
    rescue RethinkDB::RqlRuntimeError => err
      puts "Table `instance` already exists."
    end

    begin
      r.table('instance').insert({:cpu=>10,:disk_usage=>5,:processes=> %w(p1 p2), :id=>'i-035a444f5943facc8', :os => 'linux', :machine_name => 'machine-name'}).run(@connection)
    rescue RethinkDB::RqlRuntimeError => err
      puts "Cannot insert data"
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


  it 'set threshold value of instance' do

    id = 'i-035a444f5943facc8'
    threshold = 90
    command = SetInstanceThreshold.new
    command.id(id: id)
    command.threshold(threshold: threshold)
    command.execute(connection: @connection)

    instanceSaved = r.table('instance')
                        .get(id)
                        .run(@connection)

    expect(instanceSaved["threshold"]).to eq(threshold)
  end
end