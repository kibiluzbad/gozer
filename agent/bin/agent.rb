#!/usr/bin/env ruby

require 'backburner'
require 'json'
require_relative('../lib/get_machine_info')
require_relative('../lib/instance_job')

Backburner.configure do |config|
  config.beanstalk_url       = [ENV['BEANSTALKD_HOST'] || "beanstalk://127.0.0.1"]
  config.tube_namespace      = "gozer.agent.dev"
  config.namespace_separator = "."
  config.on_error            = lambda { |e| puts e }
  config.max_job_retries     = 3 # default 0 retries
  config.retry_delay         = 1 # default 5 seconds
  config.retry_delay_proc    = lambda { |min_retry_delay, num_retries| min_retry_delay + (num_retries ** 3) }
  config.default_priority    = 65536
  config.respond_timeout     = 120
  config.default_worker      = Backburner::Workers::Simple
  config.logger              = Logger.new(STDOUT)
  config.primary_queue       = "backburner-jobs"
  config.priority_labels     = { :custom => 50, :useless => 1000 }
  config.reserve_timeout     = nil
end

machine_info = GetMachineInfo.new()

fork do
  Backburner.work
end

while true

  data = machine_info.execute().to_json
  if !data.nil? || !data.empty?
    Backburner.enqueue InstanceJob, data
  end

  sleep(60)
end