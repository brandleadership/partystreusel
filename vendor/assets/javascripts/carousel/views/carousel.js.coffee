window.SC ||= {}

class SC.Carousel extends Backbone.View

  events:{
  'click .next':'switchToNext'
  'click .previous':'switchToPrevious'
  'click .next-project':'switchToNextProject'
  'click .previous-project':'switchToPreviousProject'
  }

  initialize:->
    @el = $('.stage')
    @projects = @options['projects']
    this.setDefaults()
    #    new SC.ProjectsCollection()
    #    @projects.url = '/projects'
    #    @projects.fetch()
    @currentProject = @projects.first()
    this.render(@currentProject)
    @currentProject.activate('instant')
    this.preloadProjects()
    this.prepareFiltering()
    @warning = new SC.WarningView({model:@projects})

  prepareFiltering: =>
    @model.bind 'change', this.reloadProjects if @model?

  setDefaults: ->
    @stickyProjects = !!@options['stickyProjects']

  reloadProjects: =>
    @projects.fetch({data: {filter: @model.toJSON()}, success:this.refresh})

  refresh: =>
#   TODO refactor handling of empty projects collection
    @projects.trigger 'change'
    if @projects.isEmpty()
      @projects.add @currentProject
    else
      this.switchToNextProject()

  preloadProjects: ->
    this.render this.nextProject()
    this.render this.previousProject()

  render: (project) ->
    unless project.isRendered
      v = new SC.ProjectView({model:project})
      @el.append v.render()
    return this

  switchToNext: ->
    return this.switchToNextPhoto() if @stickyProjects == true
    if @currentProject.showingLastPhoto()
      this.switchToNextProject()
    else
      this.switchToNextPhoto()
    false # Stop event

  switchToPrevious: ->
    return this.switchToPreviousPhoto() if @stickyProjects == true
    if @currentProject.showingFirstPhoto()
      this.switchToPreviousProject(true)
    else
      this.switchToPreviousPhoto()
    false # Stop event

  switchToNextPhoto:->
    @currentProject.switchToNextPhoto()
    false # Stop event

  switchToPreviousPhoto:->
    @currentProject.switchToPreviousPhoto()
    false # Stop event

  switchToNextProject:=>
    next = this.nextProject()
    this.rewindProjects() if next == @projects.first()
    this.render next
    @currentProject.deactivate('slideUp')
    @currentProject = next
    @currentProject.activate('slideDown')
    this.preloadProjects()
    false #stop event

  nextProject:->
    @projects.successor_of(@currentProject)

  switchToPreviousProject: (forwardPhotos) ->
    previous = this.previousProject()
    this.render previous
    @currentProject.deactivate('slideDown')
    @currentProject = this.previousProject()
    @currentProject.forwardPhotos() if forwardPhotos == true #true!, not the event object or something else
    @currentProject.activate('slideUp')
    this.preloadProjects()
    false #stop event

  previousProject:->
    @projects.predecessor_of(@currentProject)

  rewindProjects: ->
    for project in @projects.models
      project.rewindPhotos()
