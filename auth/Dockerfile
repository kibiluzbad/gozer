FROM phusion/passenger-ruby21

ENV HOME /root

# Create some needed directories

RUN mkdir -p /app/user
WORKDIR /app/user

EXPOSE 80

RUN rm -f /etc/service/nginx/down
RUN rm /etc/nginx/sites-enabled/default
ADD webapp.conf /etc/nginx/sites-enabled/webapp.conf

RUN gem install bundler
ADD . /app/user/
RUN bundle install
RUN chown -R app:app /app/user

