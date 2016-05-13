FROM ruby:2.3.1

ENV PORT 9292
# Create some needed directories
RUN mkdir -p /app/user
WORKDIR /app/user

RUN gem install bundler
ADD . /app/user/
RUN bundle install