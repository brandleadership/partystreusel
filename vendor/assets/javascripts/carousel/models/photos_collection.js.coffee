window.SC ||= {}

class SC.PhotosCollection extends Backbone.Collection
  model:SC.Photo

  successor_of:(member) ->
    if this.last() == member then this.first() else this.at(this.indexOf(member) + 1)

  predecessor_of:(member) ->
    if this.first() == member then this.last() else this.at(this.indexOf(member) - 1)
