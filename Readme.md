## Run with compose

grunt First drop non tracked files, like: node_modules and bower_components; If it's a new git clone or you never used it locally without docker you can skip this step.

```bash
git clean -df
```
Now run docker compose

```bash
docker-compose up -d auth
docker-compose up -d rethink api webui
docker-compose up -d beanstalkd agent
```

Add 4 more agents

```bash
docker-compose scale agent=4
```

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

## Run API tests

RethinkDB must be running.

```bash
cd api
bundle exec rspec
```

## Live Demo

http://gozer-502360373.us-east-1.elb.amazonaws.com/
