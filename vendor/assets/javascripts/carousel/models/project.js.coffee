window.SC ||={}

class SC.Project extends Backbone.Model

  initialize: ->
    @isRendered = false
    @photos = new SC.PhotosCollection(this.get 'photos')
    @currentPhoto = @photos.first()

  switchToNextPhoto: ->
    @currentPhoto.hide('slideLeft')
    @currentPhoto = this.nextPhoto()
    @currentPhoto.show('slideRight')

  nextPhoto: ->
    @photos.successor_of(@currentPhoto)

  switchToPreviousPhoto: ->
    @currentPhoto.hide('slideRight')
    @currentPhoto = this.previousPhoto()
    @currentPhoto.show('slideLeft')

  previousPhoto: ->
    @photos.predecessor_of(@currentPhoto)

  activate: (effect) ->
    @currentPhoto.show(effect)
    this.trigger 'activated'

  deactivate: (effect) ->
    @currentPhoto.hide(effect)

  showingFirstPhoto: ->
    @currentPhoto == @photos.first()

  showingLastPhoto: ->
    @currentPhoto == @photos.last()

  forwardPhotos: ->
    @currentPhoto = @photos.last()

  rewindPhotos: ->
    @currentPhoto.hide('instant')
    @currentPhoto = @photos.first()
