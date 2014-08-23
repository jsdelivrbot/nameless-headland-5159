# config.ru
$: << File.expand_path(File.dirname(__FILE__))

require './web.rb'
run App
