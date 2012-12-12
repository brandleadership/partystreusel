window.SC ||= {}

class SC.ProjectsCollection extends Backbone.Collection
  model:SC.Project

  initialize: ->
#    @url = '/projects'

  successor_of:(member) ->
    next = if this.last() == member then this.first() else this.at(this.indexOf(member) + 1)
    next = this.first() unless next?
    next

  predecessor_of:(member) ->
    if this.first() == member then this.last() else this.at(this.indexOf(member) - 1)
