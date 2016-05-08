require 'usagewatch'
require 'system'
require 'sys/filesystem'
require_relative('instance')
require 'macaddr'

class GetMachineInfo

  def execute
    usw = Usagewatch
    stat = Sys::Filesystem.stat("/")
    instance = Instance.new(cpu:usw.uw_cpuused,
                            disk_usage: stat.percent_used,
                            processes: usw.uw_cputop,
                            id: Mac.addr,
                            os: System::OS.name,
                            machine_name: Socket.gethostname)

    instance.to_hash
  end

end