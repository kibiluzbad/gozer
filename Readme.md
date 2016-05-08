## Start backend

### Start beanstalkd container
```bash
docker run -d -p 11300:11300 schickling/beanstalkd
```

### Start rethinkdb container
```bash
docker run --name rethink  -p 8080:8080 -p 28015:28015  -d rethinkdb
```

## Run auth server
```bash
cd auth
rails s
```

## Run api
```bash
cd api
bundle exec puma
```

## Run agent
```bash
cd agent
./bin/agent.rb
```

## Run web
```bash
cd webui
grunt serve
```