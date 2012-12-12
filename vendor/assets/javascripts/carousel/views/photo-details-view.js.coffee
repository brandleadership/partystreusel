window.SC ||= {}

class SC.PhotoDetailsView extends Backbone.View

  initialize: ->
    @el = $('.photo-detail')

  render: ->
    template = _.template $("#photo-details-template").html(),{image:@model.get('image')}
    @el.html(template)