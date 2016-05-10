class HomeController < ApplicationController
  doorkeeper_for :all

  def index
  end
end
