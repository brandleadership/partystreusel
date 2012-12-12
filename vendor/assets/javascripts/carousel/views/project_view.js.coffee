window.SC ||= {}

class SC.ProjectView extends Backbone.View

  initialize:->
    this.initEl()
    this.initPhotoViews()
    @model.bind 'activated', this.renderDetails

  initEl: ->
    template = _.template $("#project-template").html(), {project:@model}
    @el = $(template)

  initPhotoViews:->
    @photoViews = []
    for photo in @model.photos.models
      @photoViews.push new SC.PhotoView({model:photo})

  render:->
    for photo in @photoViews
      $(@el).append photo.el
    @model.isRendered = true
    @el

  renderDetails: =>
    v = new SC.ProjectDetailsView({model:@model})
    v.render()


