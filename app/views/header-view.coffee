View = require 'views/base/view'
template = require 'views/templates/header'

module.exports = class HeaderView extends View
  autoRender: yes
  className: 'header'
  container: '#header-container'
  id: 'header'
  template: template

  events:
  	'click a': 'changeView'


  changeView: (e) =>
  	_view = $(e.currentTarget).attr('class')
  	@subview = new (require 'views/gallery')(
  		viewType: _view
  	)
  	false

