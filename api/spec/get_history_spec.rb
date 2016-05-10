require('rethinkdb')
require_relative('../lib/queries/get_history')
require_relative('../lib/models/instance_history')

describe GetHistory do

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

    begin
      r.table('instance_history').insert({:cpu=>10,:disk_usage=>5,:processes=> %w(p1 p2), :instance_id=>'i-035a444f5943facc8', :created_at => DateTime.now.to_s}).run(@connection)
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

  it 'returns all history for instance id' do
    id = "i-035a444f5943facc8"
    query = GetHistory.new
    query.instance_id(instance_id: id)
    result = query.execute(connection: @connection)

    expect(result.count).to eq(1)
  end
end