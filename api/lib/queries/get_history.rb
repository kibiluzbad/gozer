require 'rethinkdb'

class GetHistory
  include RethinkDB::Shortcuts

  def instance_id(instance_id:)
    @instance_id = instance_id
  end

  def execute(connection:)
    r.table('instance_history').filter({"instance_id" => @instance_id}).run(connection).to_a
  end
end