require 'rethinkdb'

class SaveInstance
  include RethinkDB::Shortcuts

  def instance(instance:)
    @instance = instance
  end

  def execute(connection:)
    r.table('instance').insert(@instance.to_hash).run(connection).to_a
  end
end