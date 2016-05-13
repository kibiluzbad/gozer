require_relative('../lib/models/instance_history')

describe InstanceHistory do
  let(:instance) { InstanceHistory.new(cpu: 10, disk_usage: 5, processes: %w(process1 process2), instance_id: 'i-035a444f5943facc8') }

  context 'Initialization' do
    it 'has CPU usage'do
      expected = 10
      expect(instance.cpu).to eq(expected)
    end

    it 'has Disk usage' do
      expected = 5
      expect(instance.disk_usage).to eq(expected)
    end

    it 'has Process running' do
      expected = 2
      expect(instance.processes.count).to eq(expected)
    end

    it 'has id' do
      expected = 'i-035a444f5943facc8'
      expect(instance.instance_id).to eq(expected)
    end

    it 'has created at' do
      expect(instance.created_at).not_to be nil?
    end

  end

  context 'Hash' do
    it 'creates with instance parameters' do
      actual = instance.to_hash()

      expect(actual.is_a?(Hash)).to be true
    end
  end



end