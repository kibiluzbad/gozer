class InstanceHistory
  attr_reader :cpu, :disk_usage, :processes, :instance_id, :created_at

  def initialize(cpu:, disk_usage:, processes:, instance_id:)
    @cpu = cpu
    @disk_usage = disk_usage
    @processes = processes
    @instance_id = instance_id
    @created_at = DateTime.now
  end

  def to_hash
    # Hash[*instance_variables.map { |v|
    #   [v.to_s.delete("@"), instance_variable_get(v)]
    # }.flatten]
    #TODO: Fix this
    h = Hash.new()
    h["instance_id"] = instance_id
    h["cpu"] = cpu
    h["disk_usage"] = disk_usage
    h["processes"] = processes
    h["created_at"] = created_at.to_s
    h
  end
end