View = require 'views/base/view'
Layout = require 'views/layout'

module.exports = class Gallery extends View
	autoRender: yes
	className: 'gallery-page'
	container: '#page-container'
	containerMethod: 'append'
	template: require 'views/templates/gallery'

	initialize: =>
		@page = 2
		$(window).bind('scroll', @loadMore)
		$('.gallery-page').remove()
		@getGallery()

	getGallery: =>
		$.ajax
			dataType: 'jsonp'
			url: 'http://api.dribbble.com/shots/' + @options.viewType + '/?page=' + @options.page + '&per_page=9'
			success: (data) =>
				_.each data.shots, @format
				@wait = false

	format:(shot) =>
		@subview = new (require 'views/shot')(
			shot: shot
		)

	loadMore: =>
		if $(window).scrollTop() > $(document).height() - $(window).height() && @wait isnt true
			@wait = true
			@page++
			@options.page = @page
			@getGallery()
			


		
