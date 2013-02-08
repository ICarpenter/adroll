View = require 'views/base/view'
Layout = require 'views/layout'

module.exports = class Shot extends View
	autoRender: yes
	className: 'shot-view'
	container: '#gallery-view'
	template: require 'views/templates/shot'

	events:
		'mouseover a.image': 'showTip'
		'mouseout a.image': 'hideTip'

	initialize: =>

	afterRender: =>
		@$el.fadeIn()

		super

	getTemplateData: ->
		shot: @options.shot

	showTip: ->
		@$el.find('.tip').fadeIn()

	hideTip: ->
		@$el.find('.tip').fadeOut()


		
