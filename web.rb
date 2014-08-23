require 'sinatra/base'
require 'sinatra/assetpack'

class App < Sinatra::Base
  register Sinatra::AssetPack

  set :root, File.dirname(__FILE__)

  assets do
    # asset management with sinatra/assetpack
    serve '/js', :from => 'public/js'

    js :vendors, [
      '/js/vendors/underscore.js',
      '/js/vendors/jquery.js',
      '/js/vendors/backbone.js',
      '/js/vendors/backbone.marionette.js'
    ]
    js :helpers, [
      '/js/Helpers/*.js'
    ]
    js :application, [
      '/js/TheMoveList.js'
    ]

    # compress for production
    js_compression :jsmin
  end

  # bind to all address on machine (for development)
  set :bind, '0.0.0.0'

  get '/' do
    erb :index
  end
end
