require 'rethinkdb'

class SetInstanceThreshold
  include RethinkDB::Shortcuts

  def id(id:)
    @id = id
  end

  def threshold(threshold:)
    @threshold = threshold
  end

  def execute(connection:)
    r.table('instance').get(@id).update({threshold: @threshold}).run(connection)
  end
end