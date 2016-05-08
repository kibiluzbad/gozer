require 'rethinkdb'

class GetAllInstances
  include RethinkDB::Shortcuts

  def execute(connection:)
    r.table('instance').run(connection).to_a
  end
end