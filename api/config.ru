require 'rubygems'
require 'bundler'

Bundler.require

root = ::File.dirname(__FILE__)
require ::File.join( root, 'app' )
require ::File.join( root, 'middlewares/instance_feed' )

use Gozer::InstanceFeed
run GozerApi.new
