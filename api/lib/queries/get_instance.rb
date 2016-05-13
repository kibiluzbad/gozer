require 'rethinkdb'

class GetInstance
  include RethinkDB::Shortcuts

  def id(id:)
    @id = id
  end


  def execute(connection:)
    r.table('instance').get(@id).run(connection)
  end
end