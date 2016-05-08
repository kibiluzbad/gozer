require 'rethinkdb'

class SaveInstanceHistory
  include RethinkDB::Shortcuts

  def instance(instance_history:)
    @instance_history = instance_history
  end

  def execute(connection:)
    r.table('instance_history').insert(@instance_history.to_hash).run(connection).to_a
  end
end