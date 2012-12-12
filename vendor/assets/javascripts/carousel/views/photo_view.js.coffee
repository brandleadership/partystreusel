window.SC ||= {}

class SC.PhotoView extends Backbone.View

  tagName:"img"

  initialize:->
    this.render()
    @model.bind 'show:slideLeft', this.slideInLeft
    @model.bind 'show:slideRight', this.slideInRight
    @model.bind 'show:slideUp', this.slideInUp
    @model.bind 'show:slideDown', this.slideInDown
    @model.bind 'show:instant', this.show
    @model.bind 'hide:slideLeft', this.slideOutLeft
    @model.bind 'hide:slideRight', this.slideOutRight
    @model.bind 'hide:slideUp', this.slideOutUp
    @model.bind 'hide:slideDown', this.slideOutDown
    @model.bind 'hide:instant', this.hide
    @model.bind 'activated', this.renderDetails

  render:->
    $(@el).attr 'src', @model.get('image').url
    
  renderDetails: =>
    v = new SC.PhotoDetailsView({model:@model})
    v.render()

  slideOutLeft: =>
    this.slideOut('left')

  slideOutRight: =>
    this.slideOut('right')

  slideOutUp: =>
    this.slideOut('up')

  slideOutDown: =>
    this.slideOut('down')

  slideOut: (direction) ->
    $(@el).hide('slide', {direction: direction}, 500)

  slideInLeft: =>
    this.slideIn('left')

  slideInRight: =>
    this.slideIn('right')

  slideInUp: =>
    this.slideIn('up')

  slideInDown: =>
    this.slideIn('down')

  slideIn:(direction) ->
    $(@el).show('slide', {direction: direction}, 500)

  show: =>
    $(@el).show()

  hide: =>
    $(@el).hide()
