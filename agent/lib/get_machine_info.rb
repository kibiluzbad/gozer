require 'usagewatch'
require 'system'
require 'sys/filesystem'
require_relative('instance')
require 'macaddr'
require 'sys/proctable'
require 'rest-client'
require 'json'

class GetMachineInfo

  def execute
    usw = Usagewatch
    cpu = usw.uw_cpuused
    id = Mac.addr

    shutdown = shutdown_check(cpu, id)
    execute_shutdown if shutdown


    stat = Sys::Filesystem.stat("/")
    process_list = Sys::ProcTable.ps.sort_by(&:pctcpu).reverse.take(10).map{|p| [p.name, p.pctcpu]}
    instance = Instance.new(cpu:cpu,
                            disk_usage: stat.percent_used,
                            processes: process_list,
                            id: id,
                            os: System::OS.name,
                            machine_name: Socket.gethostname,
                            threshold: @threshold)


    instance.to_hash

  end

  private
  def get_api_instances_endpoint(id)
    (ENV['API_URL'] || 'http://localhost:9292') + "/instance/#{id}/threshold"
  end

  def get_token_url
    ENV['TOKEN_URL'] || 'http://localhost:9292/token'
  end

  def get_client_id
    ENV['OAUTH2_CLIENT_ID'] || '4de2fd79af6950291687a9df6f9ab4de93246f020a3e440186bb77fdaba25b0f'
  end

  def get_client_secret
    ENV['OAUTH2_CLIENT_SECRET'] || '6e6009447cfd2d1a0a8792805fd9efa1a6f01c6faa7b7382659b1b1446b57f2a'
  end

  def get_token
    RestClient.post get_token_url, {:client_id => get_client_id, :client_secret => get_client_secret}.to_json, :content_type => :json, :accept => :json
  end

  def format_token_header(token)
    "Bearer " + token["access_token"]
  end


  def shutdown_check(cpu, id)
    url = get_api_instances_endpoint(id)

    begin
      @threshold = RestClient::Request.execute(method: :get, url: url, headers: {authorization: format_token_header(JSON.parse(get_token))})
    rescue Exception => err
      p err
      @threshold = nil
    end

    if @threshold.nil? || @threshold.empty?
      @threshold = ""
      return false
    else
      Integer(@threshold) < Integer(cpu) unless @threshold.nil?
    end


  end

  def execute_shutdown
    p "Shutdown machine"
    system 'shutdown -h now'
  end
end