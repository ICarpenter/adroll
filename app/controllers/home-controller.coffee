Controller = require 'controllers/base/controller'
GalleryPageView = require 'views/gallery'


module.exports = class HomeController extends Controller
  historyURL: 'home'
  title: 'Home'

  index: ->
    @view = new GalleryPageView()
