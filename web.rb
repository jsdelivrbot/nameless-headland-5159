require 'sinatra/base'
require 'sinatra/assetpack'

class App < Sinatra::Base
  register Sinatra::AssetPack

  set :root, File.dirname(__FILE__)

  assets do
    # asset management with sinatra/assetpack
    serve '/js', :from => 'public/js'
    serve '/css', :from => 'public/css'
    serve '/img', :from => 'public/img'

    css :styles, [
      '/css/style.css'
    ]

    js :vendors, [
      '/js/vendors/underscore.js',
      '/js/vendors/jquery.js',
      '/js/vendors/backbone.js',
      '/js/vendors/backbone.marionette.js',
      '/js/vendors/jquery.touchSwipe.min.js'
    ]
    js :helpers, [
      '/js/Helpers/*.js'
    ]
    js :backbone, [
      '/js/Models/Game.js',
      '/js/Collections/Games.js',
      '/js/Models/Move.js',
      '/js/Collections/Moves.js'
    ]
    js :views, [
      '/js/Views/GameOption.js',
      '/js/Views/GamesDropdown.js',
      '/js/Views/CharacterOption.js',
      '/js/Views/CharactersDropdown.js',
      '/js/Views/PageOption.js',
      '/js/Views/PageDropdown.js',
      '/js/Views/MoveView.js',
      '/js/Views/CharacterView.js',
      '/js/Views/CharacterCabinet.js'
    ]
    js :routers, [
      '/js/Routers/GameRouter.js'
    ]
    js :the_move_list, [
      '/js/Applications/TheMoveList.js'
    ]

    # compress for production
    js_compression :jsmin
  end

  # bind to all address on machine (for development)
  set :bind, '0.0.0.0'

  get '/' do
    erb :index, locals: {game: "", character: ""}
  end
  get '/:game' do
    erb :index, locals: {game: params[:game], character: ""}
  end

  get '/:game/:character' do
    erb :index, locals: {game: params[:game], character: params[:character]}
  end
end
