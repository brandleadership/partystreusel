window.SC ||= {}

class SC.WarningView extends Backbone.View

  initialize: ->
    @el = $('#carousel-error-message')
    this.render()
    @model.bind 'change', this.render

  render: =>
    if @model.isEmpty()
      @el.show()
    else
      @el.hide()
