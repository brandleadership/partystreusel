window.SC ||= {}

class SC.ProjectDetailsView extends Backbone.View

  initialize: ->
    @el = $('.project-detail')

  render: ->
    template = _.template $("#project-details-template").html(),{project:@model}
    @el.html(template)
