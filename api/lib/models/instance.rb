class Instance
  attr_reader :cpu, :disk_usage, :processes, :id, :os, :machine_name
  attr_accessor :threshold

  def initialize(cpu:, disk_usage:, processes:, id:, os:, machine_name:)
    @cpu = cpu
    @disk_usage = disk_usage
    @processes = processes
    @id = id
    @os = os
    @machine_name = machine_name
  end

  def to_hash
    # Hash[*instance_variables.map { |v|
    #   [v.to_s.delete("@"), instance_variable_get(v)]
    # }.flatten]
    #TODO: Fix this
    h = Hash.new()
    h["id"] = id
    h["cpu"] = cpu
    h["disk_usage"] = disk_usage
    h["processes"] = processes
    h["os"] = os
    h["machine_name"] = machine_name
    h["threshold"] = threshold
    h
  end
end