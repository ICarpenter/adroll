Chaplin = require 'chaplin'

# Layout is the top-level application ‘view’.
module.exports = class Layout extends Chaplin.Layout

	initialize: ->
		@gallery = new (require 'views/gallery')(
			viewType: 'popular'
		)
