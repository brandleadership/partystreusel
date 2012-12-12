window.SC ||= {}

class SC.Photo extends Backbone.Model

  show: (effect) ->
    this.trigger("show:" + effect)
    this.trigger 'activated'

  hide: (effect) ->
    this.trigger("hide:" + effect)