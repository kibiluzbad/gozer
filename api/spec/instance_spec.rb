require_relative('../lib/models/instance')

describe Instance do
  let(:instance) { Instance.new(cpu: 10, disk_usage: 5, processes: %w(process1 process2), id: 'i-035a444f5943facc8', os: 'linux', machine_name: 'machine-name') }

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
      expect(instance.id).to eq(expected)
    end

    it 'has os' do
      expected = 'linux'
      expect(instance.os).to eq(expected)
    end

    it 'has machine_name' do
      expected = 'machine-name'
      expect(instance.machine_name).to eq(expected)
    end
  end

  context 'Hash' do
    it 'creates with instance parameters' do
      actual = instance.to_hash()

      expect(actual.is_a?(Hash)).to be true
      end
  end



end