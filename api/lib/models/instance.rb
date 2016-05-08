class Instance
  attr_reader :cpu, :disk_usage, :processes, :instance_id

  def initialize(cpu:, disk_usage:, processes:, instance_id:)
    @cpu = cpu
    @disk_usage = disk_usage
    @processes = processes
    @instance_id = instance_id
  end

  def to_hash
    # Hash[*instance_variables.map { |v|
    #   [v.to_s.delete("@"), instance_variable_get(v)]
    # }.flatten]
    #TODO: Fix this
    h = Hash.new()
    h["cpu"] = cpu
    h["disk_usage"] = disk_usage
    h["processes"] = processes
    h["instance_id"] = instance_id
    h
  end
end